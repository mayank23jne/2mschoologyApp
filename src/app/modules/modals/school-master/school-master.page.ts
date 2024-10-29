import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-school-master',
  templateUrl: './school-master.page.html',
  styleUrls: ['./school-master.page.scss'],
})
export class SchoolMasterPage implements OnInit {

  heading_title: String = "";
  schoolForm!: FormGroup;
  addUserType: string = "";
  editUserID: any;
  editUserData: any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.editUserData = this.navParams.get('dataSchool');
    this.editUserID = this.editUserData?.school_id;
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
    });

    if (this.editUserData) {
      console.log(this.editUserData);
      this.schoolForm.patchValue({
        name: this.editUserData.name,
        email: this.editUserData.email,
        phone: this.editUserData.phone,
        address: this.editUserData.address,
      });

    }

  }
  closeModal() {
    this.modalController.dismiss();
  }
  submit() {
    this.schoolForm.markAllAsTouched();
    const formData = new FormData();
    formData.append('name', this.schoolForm.get('name')?.value);
    formData.append('email', this.schoolForm.get('email')?.value);
    formData.append('phone', this.schoolForm.get('phone')?.value);
    formData.append('address', this.schoolForm.get('address')?.value);

    this.loader.present();
    
    if (this.editUserID) {
      formData.append('id', this.editUserID);
    }
    this.fetch.createSchool(formData).subscribe({
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
