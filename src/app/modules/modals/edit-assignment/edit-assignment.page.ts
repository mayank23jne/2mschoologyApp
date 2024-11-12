import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.page.html',
  styleUrls: ['./edit-assignment.page.scss'],
})
export class EditAssignmentPage implements OnInit {

  assignment_id: any;
  homeworkId: any;
  homeworkData: any;
  form!: FormGroup;
  classes: any;
  sections_list: any;
  defaultDate: any;
  sections: any;
  subjects: any;
  syllabus: any;
  syllabus_file: any;
  students: any;
  selectedStudentIds: any = new Set<number>();
  syllabus_file_name: any;
  syllabus_show: any = false;
  constructor(private iab: InAppBrowser, private data: DataService, private popoverController: PopoverController, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  async ngOnInit() {
    this.loader.present();
    const today = new Date();
    this.form = this.fb.group({
      assignment: ["", Validators.required],
      last_date: [""],
      class_id: ["", Validators.required],
      section_id: ["", Validators.required],
      line_number: [""],
      page_number: [""],
      subject_id: ["", Validators.required]
    });

    this.homeworkId = this.navParams.get('id');

    if (this.homeworkId) {

      const formD = new FormData();
      formD.append('homework_id', this.homeworkId);
      this.fetch.getHomeworkById(formD).subscribe({
        next: (res: any) => {

          if (res) {
            this.homeworkData = res.data;
            this.syllabus_file = res.data.homework_file;
            this.syllabus_file_name = res.data.homework_file_name;
            this.filterStudents();
            setTimeout(() => {
              this.form.patchValue({
                assignment: this.homeworkData.homework.assignment,
                last_date: this.homeworkData.homework.last_date,
                class_id: this.homeworkData.class.name,
                section_id: this.homeworkData.section.name,
                page_number: this.homeworkData.homework.page_number,
                line_number: this.homeworkData.homework.line_number,
              });
              if (this.homeworkData.selected_student_ids) {
                this.homeworkData.selected_student_ids.forEach((id: any) => {

                  this.selectedStudentIds.add(id);
                });
              }
              this.syllabus_show = true;
              this.loader.dismiss();
            }, 3000);
            this.loader.dismiss();
          }
        },
        error: (error: any) => {
          this.loader.dismiss();
        }
      });
    }

  }
  closeModal() {
    this.modalController.dismiss();
  }
  async open(fileUrl: any) {
    const options: any = {
      location: 'no', 
      toolbar: 'no', 
      hideurlbar: 'yes'
    };
    const fileName = this.syllabus_file_name;
    let pageno = '1';
    if (this.homeworkData.homework.page_number) {
      pageno = this.homeworkData.homework.page_number;
    }
    const pageNumber = pageno && pageno.includes(',') ? pageno.split(',')[0] : pageno;
    fileUrl = `https://2mschoology.com/api/pdf/${fileName}/${pageNumber}`;
    const browser = this.iab.create(fileUrl, '_self', options);
    browser.show();
  }
  isSelected(studentId: number): boolean {
    return this.selectedStudentIds.has(studentId);
  }
  toggleSelection(studentId: number, event: any) {
    if (event.detail.checked) {
      this.selectedStudentIds.add(studentId);
    } else {
      this.selectedStudentIds.delete(studentId);
    }
  }
  filterStudents() {
    const classId = this.homeworkData.homework.class_id;
    const sectionId = this.homeworkData.homework.section_id;
    const formData = new FormData();
    formData.append('class_id', classId);
    formData.append('section_id', sectionId);
    this.fetch.studentData(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          this.students = res.data;
          this.students = res.data.filter((student: any) => student.class_id === classId && student.section_id === sectionId);
        }
        else {
          this.students = "";
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });

  }

  update() {

    let selectedStudentIdsArray: any = Array.from(this.selectedStudentIds);
    this.form.markAllAsTouched();
    this.loader.present();
    const formData = new FormData();
    formData.append('selected_students', selectedStudentIdsArray.join(','));
    formData.append('homework_id', this.homeworkId);

    for (const key in this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        formData.append(key, this.form.value[key]);
      }
    }

    formData.append('class_id', this.homeworkData.homework.class_id);
    formData.append('section_id', this.homeworkData.homework.section_id);

    this.loader.dismiss();
    this.fetch.updateHomeworkData(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
          this.modalController.dismiss();
          this.loader.dismiss();
        } else {
          this.toastService.presentErrorToast(res.response);
          this.loader.dismiss();
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
        this.toastService.presentErrorToast("Error");
        this.modalController.dismiss();
      }
    });
  }
  async resetDate() {
    this.form.get('last_date')?.reset("");
    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
  }

  formatDate(dateTimeStr: string): string {
    const datePart = dateTimeStr.split('T')[0];
    return this.data.dbformatDate(datePart);
  }
  async savedate() {

    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
    if (this.form.value.last_date) {
      this.form.value.last_date = this.form.value.last_date;
    }
  }

}
