import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  public editor = ClassicEditor; 

  aboutForm!:FormGroup;
  aboutData:any;
  imagepath: any;
  img:any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder,  private modalController: ModalController) { }

  ngOnInit() {
    this.about();
    this.aboutForm = this.fb.group({
      about_us: ['',Validators.required],
      about_us_image: [''],
    });
  }

  decodeHtml(htmlString: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = htmlString;
    return textArea.value;
  }

  about() {
    this.loader.present();
    this.fetch.getAboutUs().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.aboutData = res.data;
          this.imagepath = this.aboutData.image;
          this.aboutData = this.decodeHtml(this.aboutData.about_us);
          
          // console.log(this.imagepath);
        }
        else {
          this.aboutData = [];
        }
        this.loader.dismiss();
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

  submit(){
    // console.log(this.aboutForm.value);
    let formData = this.aboutForm.value;
    this.fetch.updateAboutus(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
           this.toastService.presentToast("Updated");
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
 
}
