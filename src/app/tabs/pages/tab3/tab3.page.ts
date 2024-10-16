import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  form!: FormGroup;
  img: any;
  timestamp = Date.now();
  imagepath: any = "../../assets/profile_img.png";
  user_id: any;
  imageExists: boolean = false;
  constructor(private cdr: ChangeDetectorRef, private toastService: ToastService, private loader: LoaderService, private menu: MenuController, private fb: FormBuilder, private fetch: SchoolDataService) {
  }
  checkImage(): void {
    this.loader.present();
    this.fetch.checkProfileExists().subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res.status == true) {
          this.imageExists = true;
        } else {
          this.imageExists = false;
        }
        if (this.imageExists == true) {
          this.imagepath = "https://2mschoology.com/uploads/users/" + this.user_id + ".jpg" + `?timestamp=${this.timestamp}`;
        } else {
          this.imagepath = "../../assets/profile_img.png" + `?timestamp=${this.timestamp}`;
        }
      },
      error: (error: any) => {
      }
    });
  }
  ngOnInit() {
    
    this.imagepath = "../../assets/profile_img.png" + `?timestamp=${this.timestamp}`;
    this.checkImage();
    this.user_id = localStorage.getItem("userId");
    this.menu.enable(true, 'start');
    const timestamp = Date.now();

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
    });

    const formData = new FormData();
    this.fetch.getProfileData(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          this.form.patchValue({ name: res.data.name, email: res.data.email, phone: res.data.phone, address: res.data.address });
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
    this.loader.dismiss();
  }

  ionViewDidEnter() {
    this.cdr.detectChanges();
    this.ngOnInit();
  }

  update() {
    this.form.markAllAsTouched();
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('name', this.form.get('name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('address', this.form.get('address')?.value);
    if (this.img) {
      formData.append("profile_image", this.img);
    }
    this.loader.present();
    this.fetch.updateProfileData(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
          this.loader.dismiss();
        } else {
          this.loader.dismiss();
          this.toastService.presentErrorToast(res.response);
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  loadProfileFromDevice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    this.img = event.target.files[0];
    this.img = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagepath = reader.result as string;
        this.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagepath = '';
    }

  };

}
