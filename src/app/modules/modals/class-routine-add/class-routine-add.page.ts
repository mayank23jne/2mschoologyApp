import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-class-routine-add',
  templateUrl: './class-routine-add.page.html',
  styleUrls: ['./class-routine-add.page.scss'],
})
export class ClassRoutineAddPage implements OnInit {

  heading_title: any;
  form!: FormGroup;
  classes: any;
  sections: any;
  subjects: any;
  teachers: any;
  week_days: any;
  hours: any;
  minutes: any;
  sections_list: any;
  selectedClass: any;
  classRoomList:any;
  dayOptions:any;
  minuteOptions:any;
  hourOptions:any;
  editData:any;
  editId:any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.editId = this.navParams.get('editDataId');
    console.log(this.editId);
    if(this.editId){
      let formData = {
        "id": this.editId
      }
      this.fetch.routineSingleRowData(formData).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.form.patchValue({
              class_id: res.data.class_id,
            });
            if(res.data.class_id){
              this.onClassChange();
              this.form.patchValue({
                section_id: res.data.section_id,
                subject_id: res.data.subject_id,
                teacher_id:res.data.teacher_id,
                class_room_id: res.data.room_id,
                day:res.data.day,
                starting_hour: res.data.starting_hour,
                starting_minute: res.data.starting_minute,
                ending_hour: res.data.ending_hour,
                ending_minute: res.data.ending_minute
              });
            }

            
          }
          
        },
        error: (error: any) => {
        }
      });
    }
    
    this.form = this.fb.group({
      class_id: ["", Validators.required],
      section_id: ["", Validators.required],
      subject_id: ["", Validators.required],
      teacher_id: ["", Validators.required],
      class_room_id: ["", Validators.required],
      day: ["", Validators.required],
      starting_hour: ["", Validators.required],
      starting_minute: ["", Validators.required],
      ending_hour: ["", Validators.required],
      ending_minute: ["", Validators.required],
      id:[""]
    });

    this.classData();
    this.teacherData();
    this.classRoomData();
    this.daysData();
   
  }

  closeModal() {
    this.modalController.dismiss();
  }
  add() {
    console.log(this.form.value);
    if(this.editId){
      this.form.patchValue({
        id:this.editId
      });
    }
    this.fetch.addClassRoutine(this.form.value).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
          this.modalController.dismiss();
        }
        
      },
      error: (error: any) => {

      }
    });
  }
  classData() {
    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res.classes) {
          this.classes = res.classes;
          this.sections_list = res.section;
        }
      },
      error: (error: any) => {
      }
    });
  }
  teacherData() {
    this.fetch.getAllTeachersData().subscribe({
      next: (res: any) => {
        if (res) {
          this.teachers = res.data;
        }
      }, error: (error: any) => { }
    });
  }
  subjectData() {
    let formData = {
      "class_id": this.form?.get('class_id')?.value,
      "section_id": this.form?.get('section_id')?.value
    }
    this.fetch.subjectList(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.subjects = res.data;
        }
      }, error: (error: any) => { }
    });
  }
  onClassChange() {
    this.selectedClass = this.form?.get('class_id')?.value;
    if (this.selectedClass) {
      this.sections = this.sections_list?.filter((item: { class_id: string; }) => item.class_id === this.selectedClass);
    } else {
      this.sections = [];
    }
    this.subjectData();
  }
  classRoomData(data:any = ""){
    this.fetch.viewClassRoom(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.classRoomList = res.data;
        }
        else{
          this.classRoomList = [];
        }
      },
      error: (error:any) => {
      }
    });
  }
  daysData(data:any = ""){
    this.fetch.dropdownClassRoutine(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.dayOptions = res.data.day;
          this.hourOptions = res.data.starting_hour;
          this.minuteOptions = res.data.minute_options;
        }
      },
      error: (error:any) => {
      }
    });
  }
  
          

}
