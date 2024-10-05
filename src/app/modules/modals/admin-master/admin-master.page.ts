import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.page.html',
  styleUrls: ['./admin-master.page.scss'],
})
export class AdminMasterPage implements OnInit {

  heading_title: String = "";
  userForm!: FormGroup;
  addUserType: string = "";
  editUserID: any;
  editUserData: any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.editUserData = this.navParams.get('dataAdmin');
    this.editUserID = this.editUserData?.id;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      password: ['', Validators.required],
      gender: ['Male', Validators.required],
      address: [''],
    });

    if (this.editUserData) {

      this.userForm.patchValue({
        name: this.editUserData.user_name,
        email: this.editUserData.user_email,
        password: this.editUserData.user_password,
        gender: this.editUserData.user_gender,
        phone: this.editUserData.user_phone,
        address: this.editUserData.user_address,
      });

    }

  }
  closeModal() {
    this.modalController.dismiss();
  }
  submit() {
    this.userForm.markAllAsTouched();
    const formData = new FormData();
    formData.append('name', this.userForm.get('name')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('password', this.userForm.get('password')?.value);
    formData.append('phone', this.userForm.get('phone')?.value);
    formData.append('gender', this.userForm.get('gender')?.value);
    formData.append('address', this.userForm.get('address')?.value);

    this.loader.present();
    if (this.editUserID) {
      formData.append('id', this.editUserID);
    }
    this.fetch.createAdmin(formData).subscribe({
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
}
