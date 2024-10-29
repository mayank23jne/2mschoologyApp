import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.page.html',
  styleUrls: ['./add-teacher.page.scss'],
})
export class AddTeacherPage implements OnInit {

  heading_title:String = "";
  userForm!: FormGroup;
  addUserType:string = "";
  editTeacherID:any;
  editTeacherData:any;
  departmentList:any;

  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.addUserType = this.navParams.get('addUserType');
    this.editTeacherData = this.navParams.get('editTeacherData');
    this.editTeacherID = this.editTeacherData?.id;

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      designation: ['', Validators.required],
      department:['', Validators.required],
      phone_number:['', Validators.required],
      password: ['', Validators.required],
      gender: ['Male', Validators.required],
      address:[''],
    });

    if (this.editTeacherData) {
      console.log(this.editTeacherData);
      this.userForm.patchValue({
        name: this.editTeacherData.name,
        email: this.editTeacherData.email,
        password: this.editTeacherData.password,
        designation: this.editTeacherData.designation,
        department: this.editTeacherData.department_id,
        gender: this.editTeacherData.gender,
        phone_number: this.editTeacherData.phone,
        address: this.editTeacherData.address,
      });

    }
    this.fetch.viewDepartment().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.departmentList = res.data;
        }
        else{
          this.departmentList = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
    
  }
  closeModal() {
    this.modalController.dismiss();
  }
  submit()
  {
    this.userForm.markAllAsTouched();
    const formData = new FormData();
    formData.append('name',this.userForm.get('name')?.value);
    formData.append('email',this.userForm.get('email')?.value);
    formData.append('password',this.userForm.get('password')?.value);
    formData.append('designation',this.userForm.get('designation')?.value);
    formData.append('department',this.userForm.get('department')?.value);
    formData.append('password',this.userForm.get('password')?.value);
    formData.append('phone',this.userForm.get('phone_number')?.value);
    formData.append('gender',this.userForm.get('gender')?.value);
    formData.append('address',this.userForm.get('address')?.value);
    
    this.loader.present();
    if(this.editTeacherID){
      formData.append('id',this.editTeacherID);
    }
    this.fetch.addTeacherMaster(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.toastService.presentToast(res.response);
        this.modalController.dismiss();
        this.loader.dismiss();
      }else{
        this.toastService.presentErrorToast(res.response);
      }
      
      this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }

}
