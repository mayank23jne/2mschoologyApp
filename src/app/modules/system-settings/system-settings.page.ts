import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.page.html',
  styleUrls: ['./system-settings.page.scss'],
})
export class SystemSettingsPage implements OnInit {

  systemForm!: FormGroup;
  productUpdate!:FormGroup;
  systemLogo!:FormGroup;
  timezoneList: any;

  regularLogo: any | ArrayBuffer | null = null;
  lightLogo: any | ArrayBuffer | null = null;
  smallLogo: any | ArrayBuffer | null = null;
  favicon: any | ArrayBuffer | null = null;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {
    this.systemForm = this.fb.group({
      system_name: ['', Validators.required],
      system_email: ['', Validators.required],
      system_title: ['', Validators.required],
      phone: ['', Validators.required],
      purchase_code: ['', Validators.required],
      address: ['', Validators.required],
      fax: [''],
      footer_text: [''],
      footer_link: [''],
      timezone: [''],
    });
    this.systemLogo = this.fb.group({
      regular: [''],
      light: [''],
      small: [''],
      favicon: [''],
    });
    this.loader.present();
    this.fetch.getSystemSettings().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          let dataSystem = res.data;
          // console.log(dataSystem);
          this.systemForm.patchValue({
            system_name: dataSystem.system_name,
            system_email: dataSystem.system_email,
            system_title: dataSystem.system_title,
            phone: dataSystem.phone,
            purchase_code: dataSystem.purchase_code,
            address: dataSystem.address,
            fax: dataSystem.fax,
            footer_text: dataSystem.footer_text,
            footer_link: dataSystem.footer_link,
            timezone: dataSystem.timezone
          });

          
        
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
    this.fetch.getDateTimeZone().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.timezoneList = res.data;
        } else {
          this.toastService.presentErrorToast(res.response);
        }
      },
      error: (error: any) => {
       
      }
    });
    this.fetch.getSystemLogo().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          let dataLogo = res.data;
          // console.log(dataLogo);
          this.regularLogo = dataLogo.regular_logo;
          this.lightLogo = dataLogo.light_logo;
          this.smallLogo = dataLogo.small_logo;
          this.favicon = dataLogo.favicon;

        }
        },
        error: (error: any) => {
         
        }
      });
  }

  submit() {
    this.systemForm.markAllAsTouched();
    let formData = this.systemForm.value;
    this.loader.present();
    this.fetch.updateSystemSettings(formData).subscribe({
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
  submit_logos(){

    let formData = new FormData();
    
    if(this.regularLogo){
    formData.append('dark_logo', this.regularLogo);
    }
    if(this.regularLogo){
    formData.append('light_logo', this.lightLogo);
    }
    if(this.regularLogo){
    formData.append('small_logo', this.smallLogo);
    }
      if(this.regularLogo){
      formData.append('favicon', this.favicon);
    }

    this.fetch.uploadSystemLogo(formData).subscribe({
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

  loadProfileFromDevice(event: any, logoType: string) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        
        // Set the corresponding logo based on the logoType
        switch (logoType) {
          case 'regularLogo':
            this.regularLogo = result;
            break;
          case 'lightLogo':
            this.lightLogo = result;
            break;
          case 'smallLogo':
            this.smallLogo = result;
            break;
          case 'favicon':
            this.favicon = result;
            break;
        }
      };
      reader.readAsDataURL(file);  // Read file as Data URL
    } else {
      // Reset the selected logo in case no file is chosen
      switch (logoType) {
        case 'regularLogo':
          this.regularLogo = null;
          break;
        case 'lightLogo':
          this.lightLogo = null;
          break;
        case 'smallLogo':
          this.smallLogo = null;
          break;
        case 'favicon':
          this.favicon = null;
          break;
      }
    }
  }
}
