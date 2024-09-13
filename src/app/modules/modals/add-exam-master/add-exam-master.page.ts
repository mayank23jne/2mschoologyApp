import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-exam-master',
  templateUrl: './add-exam-master.page.html',
  styleUrls: ['./add-exam-master.page.scss'],
})
export class AddExamMasterPage implements OnInit {

  heading_title:String = "";

  examForm!: FormGroup;
  gradeForm!: FormGroup;

  examData:any;
  examID:any;
  gradeData:any;
  gradeID:any;

  editExamData:any;
  editExamID:any;
  editGradeData:any;
  editGradeID:any;

  module_name:any;
  defaultDate:any;
  setDefaultDate:any;
  constructor(private datePipe: DatePipe,private popoverController: PopoverController,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.module_name = this.navParams.get('module_name');

    this.editExamData = this.navParams.get('editExamData');
    this.editExamID = this.editExamData?.id;

    this.editGradeData = this.navParams.get('editGradeData');
    this.editGradeID = this.editGradeData?.id;
    
    this.initializeForms();
  }
  private initializeForms() {
    const today = new Date();
    const defaultYear = today.getFullYear();
    const defaultMonth = today.getMonth() + 1;
    const defaultDay = today.getDate() + 1;
    this.defaultDate = new Date(defaultYear, defaultMonth - 1, defaultDay).toISOString().split('T')[0];
    this.setDefaultDate = new Date().toISOString();
    
    this.examForm = this.fb.group({
      exam_name: [this.editExamData?.name || '', Validators.required],
      starting_date: [this.formatDate(this.editExamData?.starting_date) || this.formatDate(this.defaultDate), Validators.required],
      ending_date: [this.formatDate(this.editExamData?.ending_date) || this.formatDate(this.defaultDate), Validators.required],
    });
    this.gradeForm = this.fb.group({
      grade: [this.editGradeData?.name || '', Validators.required],
      grade_point: [this.editGradeData?.grade_point || '', Validators.required],
      mark_from: [this.editGradeData?.mark_from || '', Validators.required],
      mark_upto: [this.editGradeData?.mark_upto || '', Validators.required],
    });
}

closeModal() {
  this.modalController.dismiss();
}
formatDate(date: Date | any): any | null {
  return this.datePipe.transform(date, 'MM/dd/yyyy');
}
submit_exam(){
      this.examForm.markAllAsTouched();
      const formData = new FormData();
      formData.append('exam_name', this.examForm.get('exam_name')?.value);
      formData.append('starting_date', this.examForm.get('starting_date')?.value);
      formData.append('ending_date', this.examForm.get('ending_date')?.value);
      if(this.editExamID){
        formData.append('id', this.editExamID);
      }
      this.loader.present();
      this.fetch.addExam(formData).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.toastService.presentToast(res.response);
            this.modalController.dismiss();
            this.loader.dismiss();
          } else {
            this.toastService.presentErrorToast(res.response);
          }
          this.loader.dismiss();
        },
        error: (error: any) => {
          this.loader.dismiss();
        }
      });
}
submit_grade(){
  this.gradeForm.markAllAsTouched();
  const formData = new FormData();
  formData.append('grade', this.gradeForm.get('grade')?.value);
  formData.append('grade_point', this.gradeForm.get('grade_point')?.value);
  formData.append('mark_from', this.gradeForm.get('mark_from')?.value);
  formData.append('mark_upto', this.gradeForm.get('mark_upto')?.value);
  if(this.editGradeID){
    formData.append('id', this.editGradeID);
  }
  this.loader.present();
  this.fetch.addGrade(formData).subscribe({
    next: (res: any) => {
      if (res.code == 200) {
        this.toastService.presentToast(res.response);
        this.modalController.dismiss();
        this.loader.dismiss();
      } else {
        this.toastService.presentErrorToast(res.response);
      }

      this.loader.dismiss();
    },
    error: (error: any) => {
      this.loader.dismiss();
    }
  });
}
async resetStartDate() {
  this.examForm.get('starting_date')?.reset(""); // Reset to current date
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}
async resetEndDate() {
  this.examForm.get('ending_date')?.reset(""); // Reset to current date
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}
async savedate() {
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}

setStartDate() {
  console.log(this.examForm.value.starting_date);
}

setEndDate(){
  console.log(this.examForm.value.ending_date);
}

async saveEndDate(){
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}

}

