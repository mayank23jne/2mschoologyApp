import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  policyData:any;
  policyForm:any;
  public editor = ClassicEditor; 
  
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder,  private modalController: ModalController) { }

  ngOnInit() {
    this.termsAndConditions();
    this.policyForm = this.fb.group({
      privacy_policy: ['', Validators.required]
    });
  }
  decodeHtml(htmlString: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = htmlString;
    return textArea.value;
  }
  termsAndConditions() {
    this.loader.present();
    this.fetch.getPrivacyPolicy().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.policyData = res.data;
          this.policyData = this.decodeHtml(this.policyData);
        }
        else {
          this.policyData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  submit(){
      console.log(this.policyForm.value);
      let formData = this.policyForm.value;
      this.fetch.updatePrivacyPolicy(formData).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.loader.dismiss();
             this.toastService.presentToast("Updated");
          }
          else {
          }
          this.loader.dismiss();
        },
        error: (error: any) => {
          this.loader.dismiss();
        }
      });
  }

}
