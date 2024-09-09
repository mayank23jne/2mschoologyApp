import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { SubmitGradePage } from '../submit-grade/submit-grade.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.page.html',
  styleUrls: ['./view-assignment.page.scss'],
})
export class ViewAssignmentPage implements OnInit {

  form!: FormGroup;
  assignment_id:any;
  homeworkId:any;
  homeworkData:any;
  studentsList:any;

  constructor(private iab: InAppBrowser,private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  async ngOnInit() {
    
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
      this.loader.present();
      const formD = new FormData();
      formD.append('homework_id', this.homeworkId);
      this.fetch.getHomeworkById(formD).subscribe({
        next: (res: any) => {
          if (res) {
            this.homeworkData = res.data;
              this.studentsList = res.data.stu_data;
              this.form.patchValue({
                assignment: this.homeworkData.homework.assignment,
                last_date: this.homeworkData.homework.last_date,
                class_id: this.homeworkData.class.name,
                section_id: this.homeworkData.section.name,
                page_number: this.homeworkData.homework.page_number,
                line_number: this.homeworkData.homework.line_number,
              });
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
  generateUniqueFileName(baseName:any) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); 
    return `${baseName}_${timestamp}.pdf`;
  }
  async open(fileUrl:any) {
    const options:any = {
      location: 'no', 
      toolbar: 'no', 
      hideurlbar: 'yes' 
    };
    const fileName = this.homeworkData?.homework_file_name;
    let pageno = 1;
    if(this.homeworkData.homework.page_number){
      pageno = this.homeworkData.homework.page_number;
    } 
    fileUrl = `https://2mschoology.com/api/pdf/${fileName}/${pageno}`;
    const browser = this.iab.create(fileUrl, '_self',options);
    browser.show();
  }
  async openSubmitGrade(item: any) {
      const modal = await this.modalController.create({
        component: SubmitGradePage,
        cssClass: '',
        componentProps: {
          title: "Submit Grade",
          item: item,
          homework_id:this.homeworkId
        }
      });
      modal.onDidDismiss().then((dataReturned) => {
        this.ngOnInit();
      });
  
      return await modal.present();
  }
}
