import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sendsmssetting',
  templateUrl: './sendsmssetting.page.html',
  styleUrls: ['./sendsmssetting.page.scss'],
})
export class SendsmssettingPage implements OnInit {
 
  smsCycle: string = 'twillio_setting'; 
  settingsForm!: FormGroup;
  twilioForm!: FormGroup;
  selectedProvider:any;
  smsStatus:any;
  constructor(private fb:FormBuilder,private toastService:ToastService,private fetch: SchoolDataService, private loader: LoaderService,private menu: MenuController) {
  }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      communicationProvider: ['none']  
    });
    this.twilioForm = this.fb.group({
      twillio_sid: ['', Validators.required],
      twillio_token: ['', Validators.required],
      twillio_from: ['', Validators.required],
      user_type:['twilliosetting'],
    });
    this.settingsForm.get('communicationProvider')?.valueChanges.subscribe(value => {
      this.selectedProvider = value;
        // console.log(this.selectedProvider);
        const formData = new FormData();
        formData.append('activSmsGateway',this.selectedProvider);
        formData.append('userType', 'activSmsGateway');
        this.submit(formData);
    });
    this.fetch.getTwillioSetting().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          if(res.data?.sms_status == '1'){
            this.smsStatus = 'twillio';
          }else{
            this.smsStatus = 'none';
          }
          this.settingsForm.patchValue({
            communicationProvider: this.smsStatus,
          });
          this.twilioForm.patchValue({
            twillio_sid: res.data?.sid,
            twillio_token: res.data?.token,
            twillio_from: res.data?.sender_phone_no,
            user_type:'twilliosetting',
          });
          
        } else {
          
        }
      },
      error: (error: any) => {
      }
    });
  }
  toggleSmsCycle() {
    console.log('changed to:', this.smsCycle);
  }
  submitSetting(){
    let formData = this.twilioForm.value;
    this.submit(formData);
  }
  submit(formdata:any) {
    this.fetch.updateTwillioSetting(formdata).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
        } else {
          this.toastService.presentErrorToast(res.response);
        }
      },
      error: (error: any) => {
      }
    });
  }
  
}

