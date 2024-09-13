import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.page.html',
  styleUrls: ['./school-settings.page.scss'],
})
export class SchoolSettingsPage implements OnInit {

  schoolSettingForm!:FormGroup;
  schoolSettingData:any;
  schoolData:any;
  constructor(private data:DataService,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder) { }

  ngOnInit() {

    this.dataSchool();
    console.log(this.schoolSettingData);
    this.schoolSettingForm = this.fb.group({
      school_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
 dataSchool(){
    this.loader.present();
    this.fetch.schoolSettings().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.schoolSettingData = res.data;
          this.schoolSettingForm.patchValue({
            school_name: this.schoolSettingData.name,
            phone:  this.schoolSettingData.phone,
            address:  this.schoolSettingData.address,
          })
        }
        else{
          this.schoolSettingData = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  update(){
    const formData = new FormData();
    formData.append('name', this.schoolSettingForm.get('school_name')?.value);
    formData.append('phone', this.schoolSettingForm.get('phone')?.value);
    formData.append('address', this.schoolSettingForm.get('address')?.value);
    this.fetch.updateSchoolSettings(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.toastService.presentToast(res.response);
        }
        else{
          this.schoolSettingData = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
}
