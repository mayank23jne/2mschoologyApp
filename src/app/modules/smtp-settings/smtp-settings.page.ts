import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-smtp-settings',
  templateUrl: './smtp-settings.page.html',
  styleUrls: ['./smtp-settings.page.scss'],
})
export class SmtpSettingsPage implements OnInit {

  heading_title: String = "";
  smtpForm!: FormGroup;
  showTextFields: boolean = false; 

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {
   
    this.smtpForm = this.fb.group({
      mail_sender: ['php_mailer', Validators.required],
      smtp_protocol: ['', Validators.required],
      smtp_host: ['', Validators.required],
      smtp_username: ['', Validators.required],
      smtp_password: ['', Validators.required],
      smtp_port: ['', Validators.required],
      smtp_secure:  [''],
      smtp_set_from: ['']
    });

  }
  onMailSenderChange(event: any) {
    const selectedValue = event.detail.value;
    this.showTextFields = (selectedValue === 'generic_mailer'); 
  }
  closeModal() {
    this.modalController.dismiss();
  }
  submit() {
    this.smtpForm.markAllAsTouched();
    const formData = this.smtpForm.value;
    this.loader.present();
    this.fetch.updateSmtpSettings(formData).subscribe({
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
