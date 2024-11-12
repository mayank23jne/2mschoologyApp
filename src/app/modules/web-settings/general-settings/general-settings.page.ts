import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.page.html',
  styleUrls: ['./general-settings.page.scss'],
})
export class GeneralSettingsPage implements OnInit {

  imageHeaderlogo:any;
  imageFooterlogo:any;
  img:any;
  generalSettingForm!:FormGroup;
  generalAllData:any;
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder,  private modalController: ModalController) { }

  ngOnInit() {
    this.generalData();
    this.generalSettingForm = this.fb.group({
      facebook_link: [''],
      twitter_link: [''],
      linkedin_link: [''],
      google_link: [''],
      youtube_link: [''],
      instagram_link: [''],
      website_title: [''],
      homepage_note_title: [''],
      homepage_note_description: [''],
      copyright_text: [''],
    });
  }
  generalData() {
    this.loader.present();
    this.fetch.getGeneralSettings().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.generalAllData = res.data;

          this.generalSettingForm.patchValue({
            facebook_link: this.generalAllData?.facebook,
            twitter_link: this.generalAllData?.twitter,
            linkedin_link: this.generalAllData?.linkedin,
            google_link: this.generalAllData?.google,
            youtube_link: this.generalAllData?.youtube,
            instagram_link: this.generalAllData?.instagram,
            website_title: this.generalAllData?.website_title,
            homepage_note_title: this.generalAllData?.homepage_note_title,
            homepage_note_description: this.generalAllData?.homepage_note_description,
            copyright_text: this.generalAllData?.copyright_text,
          });
          if(this.generalAllData?.logo){
            this.imageHeaderlogo = this.generalAllData?.logo;
            this.imageFooterlogo = this.generalAllData?.logo;
          }

        }
        else {
          this.generalAllData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  submit(){
  console.log(this.generalSettingForm.value);
      let formData = this.generalSettingForm.value;
      this.fetch.updateGeneralSettings(formData).subscribe({
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

  loadProfileFromDevice(event: any,type:any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    this.img = event.target.files[0];
    this.img = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if(type = 'header'){
          this.imageHeaderlogo = reader.result as string;
        }else{
          this.imageFooterlogo = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      
    }

  };
}
