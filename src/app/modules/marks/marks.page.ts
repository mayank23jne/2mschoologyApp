import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { UpdateMarksPage } from '../modals/update-marks/update-marks.page';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {

  exam_data: any;
  exam_id: any;
  subject_id: any;
  class_id: any;
  student_id: any;
  section_id: any;
  role: any;
  subjects: any;
  mark_data: any;
  access_msg: any;
  access_msg_title: any;
  code: any;
  exam_name: any;
  subject_name: any;
  class_name: any;
  section_name: any;
  constructor(private data: DataService, private cdr: ChangeDetectorRef, private modalController: ModalController, private fetch: SchoolDataService, private loader: LoaderService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.exam_list();
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges();
    });
  }

  exam_list(formData: any = "") {
    this.fetch.examData(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.exam_data = res.data;
        }
        else {
          this.exam_data = [];
        }
      },
      error: (error: any) => {
        this.exam_data = [];
      }
    });
  }
  onFilterChange(event: any) {
    this.class_id = event.class;
    this.section_id = event.section;
    this.student_id = event.student_id;

    let formData = {
      "class_id": this.class_id,
      "section_id": this.section_id,
    }
    this.subject_list(formData);
  }

  filter() {
    this.loader.present();
    let formData = {
      "class_id": this.class_id,
      "section_id": this.section_id,
      "subject": this.subject_id.id,
      "exam": this.exam_id.id,
      "student_id": this.student_id
    }
    this.fetch.getMarksData(formData).subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res.code == 200) {
          this.exam_name = this.exam_id.name;
          this.subject_name = this.subject_id.name;

          if (res.data && res?.data[0].class_id.name) {
            this.class_name = res.data[0].class_id.name;
            this.section_name = res.data[0].section_id.name;
          }

          this.mark_data = res.data;


          this.code = "";
          this.access_msg = "";
          this.access_msg_title = "";
        }
        else if (res.code == 401) {
          this.code = res.code;
          this.access_msg_title = res.response.first_msg;
          this.access_msg = res.response.second_msg;

        }
        else {
          this.code = "";
          this.access_msg = "";
          this.access_msg_title = "";
          this.mark_data = [];
        }
      },
      error: (error: any) => {
        this.mark_data = [];
      }
    });
  }

  subject_list(formData: any = "") {
    this.fetch.subjectList(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.subjects = res.data;
          this.subject_id = res.data[0].id;
        }
        else {
          this.subjects = [];
        }
      },
      error: (error: any) => {
        this.subjects = [];
      }
    });
  }

  async openAddMarksModal(item: any) {

    const modal = await this.modalController.create({
      component: UpdateMarksPage,
      cssClass: '',
      componentProps: {
        title: "Update Marks",
        mark_data: item
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.filter();
    });
    return await modal.present();
  }

}
