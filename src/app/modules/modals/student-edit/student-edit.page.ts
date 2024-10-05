import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {

  heading_title: any;
  form!: FormGroup;
  img: any;
  imagepath: any = "../../assets/profile_img.png";
  dob: any;
  date: any;
  studentId: any;
  studentData: any;
  classes: any;
  sections_list: any;
  sections: any;
  user_id: any;
  subjects: any;
  selectedFile: any;
  parent_list: any;
  imageExists: boolean = false;
  role:any;

  constructor(private data: DataService,private popoverController: PopoverController, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private router: Router, private navParams: NavParams, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.heading_title = this.navParams.get('title');
    this.studentId = this.navParams.get("id");
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ["", Validators.required],
      password: [""],
      birthday: ["", Validators.required],
      parent_id: ["", Validators.required],
      class_id: ["", Validators.required],
      section_id: ["", Validators.required],
      blood_group: ["", Validators.required],
      gender: ["Male", Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.studentData = this.navParams.get('studentData');
    let formData = new FormData();
    formData.append('user_type', "parent");
    this.adminParentList(formData);
    
    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res) {
          this.classes = res.classes;
          this.sections_list = res.section;
          
        }
      },
      error: (error: any) => {

      }
    });
    if (this.studentData) {
      if(this.studentData?.photo){
          this.imagepath = this.studentData?.photo;
      }else{
        this.imagepath = "";
      }
      this.form.patchValue({
        name: this.studentData?.name,
        email: this.studentData?.email,
        password: this.studentData?.password,
        birthday: this.studentData?.birthday,
        parent_id: this.studentData?.parent_id?.id,
        class_id: this.studentData?.class_id?.id,
        section_id: this.studentData?.section_id?.id,
        blood_group: this.studentData?.blood_group,
        gender: this.studentData?.gender,
        phone: this.studentData?.phone,
        address: this.studentData?.address,
      });

      setTimeout(() => {
        this.onClassChange();
      }, 3000);
      
    }
  }

  adminParentList(data:any){
    this.fetch.viewUserMaster(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
          this.parent_list = res.data;
        }
        else{
          this.parent_list = "";
        }
      },
      error: (error:any) => {
        
      }
    });
  }
  onClassChange() {
    const formData = new FormData();
    this.sections = this.sections_list.filter((item: { class_id: any; }) => item.class_id === this.form.get('class_id')?.value);

  }
  update() {
    this.form.markAllAsTouched();
    const formData = new FormData();
    if(this.studentId){
    formData.append('student_id', this.studentId);
    formData.append("student_image", this.img);
    for (const key in this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        formData.append(key, this.form.value[key]);
      }
    }
    this.loader.present();
    this.fetch.studentUpdate(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.modalController.dismiss();
          this.toastService.presentToast(res.response);
        } else {
          this.toastService.presentErrorToast(res.response);
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }

    });
  }else{
    formData.append("student_image", this.img);
    for (const key in this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        formData.append(key, this.form.value[key]);
      }
    }
    this.loader.present();
    this.fetch.addAdmissionSingleStudent(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.modalController.dismiss();
          this.toastService.presentToast(res.response);

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

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  loadProfileFromDevice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    this.img = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagepath = reader.result as string;
        this.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagepath = '';
    }
  };
  setdate() {
    console.log(this.form.value.birthday);
  }
  async resetDate() {
    this.form.get('birthday')?.reset(""); // Reset to current date
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
    if (this.form.value.birthday) {
      this.form.value.birthday = this.formatDate(this.form.value.birthday);
    }
  }
  formatDate(dateTimeStr: string): string {
    const datePart = dateTimeStr.split('T')[0];
    return datePart;
  }
  closeModal() {
    this.modalController.dismiss();
  }

}
