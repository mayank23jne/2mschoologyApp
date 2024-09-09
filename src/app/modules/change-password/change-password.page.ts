import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { passwordMatch } from 'src/validators/passwordMatch';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, public formBuilder: FormBuilder, public router: Router, private menu: MenuController) { }
  userID: any;
  ChangePasswordForm!: FormGroup;
  OldpasswordType: string = 'password';
  OldpasswordIcon: string = 'eye-off';
  NewpasswordType: string = 'password';
  NewpasswordIcon: string = 'eye-off';
  ConfirmpasswordType: string = 'password';
  ConfirmpasswordIcon: string = 'eye-off';

  ngOnInit() {
    this.ChangePasswordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { validator: passwordMatch('newpassword', 'confirm_password') });

  }
  get errorControl() {
    return this.ChangePasswordForm.controls;
  }
  CurrenthideShowPassword() {
    this.OldpasswordType = this.OldpasswordType === 'text' ? 'password' : 'text';
    this.OldpasswordIcon = this.OldpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideShowPassword() {
    this.NewpasswordType = this.NewpasswordType === 'text' ? 'password' : 'text';
    this.NewpasswordIcon = this.NewpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  confirmhideShowPassword() {
    this.ConfirmpasswordType = this.ConfirmpasswordType === 'text' ? 'password' : 'text';
    this.ConfirmpasswordIcon = this.ConfirmpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  ChangePassword() {

    this.ChangePasswordForm.markAllAsTouched();

    let formData = {'current_password': this.ChangePasswordForm.get('oldpassword')?.value, 'new_password': this.ChangePasswordForm.get('newpassword')?.value, 'confirm_password': this.ChangePasswordForm.get('confirm_password')?.value };

    this.fetch.changePassword(formData).subscribe({
      next: (res) => {
        if (res) {
          this.loader.dismiss();
          if (res.code == 200) {
            this.ChangePasswordForm.patchValue({ oldpassword: '', newpassword: '', confirm_password: '' });
            this.ChangePasswordForm.markAsUntouched();
            this.toastService.presentToast(res.response);
          }
          else {
            this.toastService.presentErrorToast(res.response);
            this.loader.dismiss();
          }
        }
        this.loader.dismiss();
      },
      error: (error) => {

        this.loader.dismiss();
      }
    });
  }

}

