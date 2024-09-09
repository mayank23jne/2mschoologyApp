import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.page.html',
  styleUrls: ['./take-attendance.page.scss'],
})
export class TakeAttendancePage implements OnInit {

  heading_title: any;
  form!: FormGroup;
  formAttendance!: FormGroup;
  show: any = false;
  class_id:any;
  section_id:any;
  defaultDate:any;
  students:any =[];

  constructor(private toastService:ToastService,private fetch: SchoolDataService,private loader: LoaderService,private data: DataService,private popoverController: PopoverController, private fb: FormBuilder,  private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    const today = new Date();
    this.heading_title = this.navParams.get('title');
    this.form = this.fb.group({
      class: ["", Validators.required],
      section: ["", Validators.required],
      dob: [""],
    });
    this.formAttendance = this.fb.group({
      attendances: this.fb.array(this.students?.map((student: any) => this.createAttendanceControl(student)))
    });

    const defaultYear = today.getFullYear();
    const defaultMonth = today.getMonth() + 1;
    const defaultDay = today.getDate() + 1;
    this.defaultDate = new Date(defaultYear, defaultMonth - 1, defaultDay).toISOString().split('T')[0];

    this.form.get('dob')?.setValue(this.defaultDate);
  }
  closeModal() {
    this.modalController.dismiss();
  }
  show_student_list() {
    this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
      this.formAttendance = this.fb.group({
        attendances: this.fb.array(this.students?.map((student: any) => this.createAttendanceControl(student)))
      });

      this.show = true;
    }, 2000);
    
  }
  add() {

   let attendances = this.formAttendance.value.attendances;
   const filteredAttendances = attendances.filter((attendance: { status: string; }) => attendance.status !== '');

   let date_attendance = this.data.formatYmd(this.form.value.dob);
   let formData = {"class_id":this.class_id,"section_id":this.section_id,"date":date_attendance,"attendance":filteredAttendances}
   this.fetch.submitAttendance(formData).subscribe({
    next:(res:any) => {
    if(res.code == 200){
  
        this.toastService.presentToast(res.response);
        this.modalController.dismiss();
      }
      else{
        
      }
     
    },
    error: (error:any) => {
     
    }
  });
  }
  setdate() {
    console.log(this.form.value.dob);
  }
  async resetDate() {
    this.form.get('dob')?.reset("");
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
  createAttendanceControl(student: any) {
    return this.fb.group({
      id: [student.student_id],
      name: [student.name],
      status: [""]
    });
  }
  get attendances() {
    
    return this.formAttendance?.get('attendances') as FormArray;
  }

  presentAll() {
    this.attendances.controls.forEach(control => {
      control.get('status')?.setValue('P');
    });
  }

  absentAll() {
    this.attendances.controls.forEach(control => {
      control.get('status')?.setValue('A');
    });
  }

  onSubmit() {
    console.log(this.formAttendance.value);
  }
  onFilterChange(event: { class: string, section: string ,student_id:any }) {
    this.class_id =  event.class;
    this.section_id = event.section;
    let formData = {"class_id":this.class_id,"section_id":this.section_id}
    this.fetch.studentData(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
      
         this.students = res.data.filter((student: any) => student.class_id === this.class_id && student.section_id === this.section_id);
        
        }
        else{
          this.students = [];
        }
       
      },
      error: (error:any) => {
       
      }
    });
    
  }




}
