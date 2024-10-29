import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.page.html',
  styleUrls: ['./add-master.page.scss'],
})
export class AddMasterPage implements OnInit {

  heading_title:String = "";

  classForm!: FormGroup;
  classRoomForm!: FormGroup;
  deptForm!: FormGroup;
  subjectForm!: FormGroup;
  eventCalendarForm!: FormGroup;
  module_name:any;

  editClassData:any;
  editClassID:any;

  editClassRoomData:any;
  editClassRoomID:any;

  editDeptData:any;
  editDeptID:any;

  editSubjectData:any;
  editSubjectID:any;

  editEventData:any;
  editEventID:any;
  
  classList:any;
  showClass = false;
  class_nm:any;
  defaultDate:any;
  setDefaultDate:any;
  constructor(private datePipe: DatePipe,private data:DataService,private popoverController: PopoverController, private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.module_name = this.navParams.get('module_name');
    
    this.editClassData = this.navParams.get('editClassData');
    this.editClassID = this.editClassData?.id;

    this.editClassRoomData = this.navParams.get('editClassRoomData');
    this.editClassRoomID = this.editClassRoomData?.id;

    this.editDeptData = this.navParams.get('editDeptData');
    this.editDeptID = this.editDeptData?.id;

    this.editSubjectData = this.navParams.get('editSubjectData');
    this.editSubjectID = this.editSubjectData?.id;

    this.editEventData = this.navParams.get('editEventData');
    this.editEventID = this.editEventData?.event_id;

    this.initializeForms();
    this.classData();
  }
  onFilterChange(){
    console.log(this.class_nm);
  }
  private initializeForms() {
   
    this.classForm = this.fb.group({
      class_name: [this.editClassData?.class || '', Validators.required],
    });

    this.classRoomForm = this.fb.group({
      class_room_name: [this.editClassRoomData?.name || '', Validators.required],
    });

    this.deptForm = this.fb.group({
      dept_name: [this.editDeptData?.name || '', Validators.required],
    });

    this.subjectForm = this.fb.group({
      class: [this.editSubjectData?.class_id || '', Validators.required],
      subject_name: [this.editSubjectData?.name || '', Validators.required],
    });
    const today = new Date();
    const defaultYear = today.getFullYear();
    const defaultMonth = today.getMonth() + 1;
    const defaultDay = today.getDate() + 1;
    this.defaultDate = new Date(defaultYear, defaultMonth - 1, defaultDay).toISOString().split('T')[0];
    this.setDefaultDate = new Date().toISOString();
    
    this.eventCalendarForm = this.fb.group({
      title: [this.editEventData?.title || '', Validators.required],
      starting_date: [this.formatDate(this.editEventData?.starting_date) || this.formatDate(this.defaultDate), Validators.required],
      ending_date: [this.formatDate(this.editEventData?.ending_date) || this.formatDate(this.defaultDate), Validators.required],
    });
}

formatDate(date: Date | any): any | null {
  return this.datePipe.transform(date, 'MM/dd/yyyy');
}
closeModal() {
  this.modalController.dismiss();
}
classData(){
  this.loader.present();
  this.fetch.viewClass().subscribe({
    next:(res:any) => {
    if(res.code == 200){
      this.loader.dismiss();
      this.classList = res.data;
      setTimeout(() => {
        this.showClass = true;
        console.log(this.classList);
        this.loader.dismiss();
      }, 2000);
        
      }
      else{
        this.classList = "";
      }
      
    },
    error: (error:any) => {
      this.loader.dismiss();
    }
  });
}
submit_class(){
      this.classForm.markAllAsTouched();
      const formData = new FormData();
      formData.append('name', this.classForm.get('class_name')?.value);
      if(this.editClassID){
        formData.append('id', this.editClassID);
      }
      this.loader.present();
      this.fetch.addClass(formData).subscribe({
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
submit_classRoom(){
    this.classRoomForm.markAllAsTouched();
    const formData = new FormData();
    formData.append('name', this.classRoomForm.get('class_room_name')?.value);
    
    if(this.editClassRoomID){
      formData.append('id', this.editClassRoomID);
    }
    this.loader.present();
    this.fetch.addClassRoom(formData).subscribe({
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
submit_department(){
  this.deptForm.markAllAsTouched();
  const formData = new FormData();
  formData.append('name', this.deptForm.get('dept_name')?.value);
  if(this.editDeptID){
    formData.append('id', this.editDeptID);
  }
  this.loader.present();
  this.fetch.addDepartment(formData).subscribe({
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
submit_subject(){
  this.subjectForm.markAllAsTouched();
  const formData = new FormData();
  formData.append('class_id', this.subjectForm.get('class')?.value);
  formData.append('name', this.subjectForm.get('subject_name')?.value);
  if(this.editSubjectID){
    formData.append('id', this.editSubjectID);
  }
  this.loader.present();
  this.fetch.addSubject(formData).subscribe({
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
submit_event(){
  this.eventCalendarForm.markAllAsTouched();
  const formData = new FormData();
  let startDate = this.formatDate(this.eventCalendarForm.get('starting_date')?.value);
  let endDate = this.formatDate(this.eventCalendarForm.get('ending_date')?.value);
  formData.append('title', this.eventCalendarForm.get('title')?.value);
  formData.append('starting_date', startDate);
  formData.append('ending_date', endDate);

  if(this.editEventID){
    formData.append('id', this.editEventID);
  }
  this.loader.present();
  this.fetch.addEventCalendar(formData).subscribe({
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
  this.eventCalendarForm.get('starting_date')?.reset(""); // Reset to current date
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}
async resetEndDate() {
  this.eventCalendarForm.get('ending_date')?.reset(""); // Reset to current date
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
  console.log(this.eventCalendarForm.value.starting_date);
}

setEndDate(){
  console.log(this.eventCalendarForm.value.ending_date);
}

async saveEndDate(){
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}

}
