import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  termsForm!:FormGroup;
  termsData:any;
  public editor = ClassicEditor; 
  
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder,  private modalController: ModalController) { }

  ngOnInit() {
    this.termsAndConditions();
    this.termsForm = this.fb.group({
      terms_and_conditions: ['', Validators.required]
    });
  }
  decodeHtml(htmlString: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = htmlString;
    return textArea.value;
  }
  termsAndConditions() {
    this.loader.present();
    this.fetch.getTermsAndConditions().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.termsData = res.data;
          this.termsData = this.decodeHtml(this.termsData);
        }
        else {
          this.termsData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  submit(){
    console.log(this.termsForm.value);
      let formData = this.termsForm.value;
      this.fetch.updateTermsAndConditions(formData).subscribe({
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
