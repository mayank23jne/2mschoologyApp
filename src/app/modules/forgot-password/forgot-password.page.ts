import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form!: FormGroup;
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, public formBuilder: FormBuilder, private fb: FormBuilder, public router: Router) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }
 
  submit(){
    this.loader.present();
    this.form.markAllAsTouched();
    const formData: FormData = new FormData();
    formData.append('email_id', this.form.get('email')?.value);
    this.fetch.forgot_password(formData).subscribe({
      next: (res) => {
        if (res) {
          this.loader.dismiss();
          if (res.code == 200) {
            this.toastService.presentEmailToast(res.response);
            this.form.patchValue({ email: ''});
            this.router.navigateByUrl('/login');
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
