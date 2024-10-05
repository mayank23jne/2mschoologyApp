import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  public editor = ClassicEditor; 

  otherForm!:FormGroup;
  otherData:any;
  imagepath: any;
  img:any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder,  private modalController: ModalController) { }

  ngOnInit() {
    this.other();
    this.otherForm = this.fb.group({
      login_page_banner: ['',Validators.required],
    });
  }

  decodeHtml(htmlString: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = htmlString;
    return textArea.value;
  }

  other() {
    this.loader.present();
    this.fetch.getOthersSettings().subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.otherData = res.data;
          this.imagepath = res.data?.image;
          console.log(this.otherData);
        }
        else {
          this.otherData = [];
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
    console.log(this.img);
    let formData = this.otherForm.value;
    // this.fetch.updateOtherSettings(formData).subscribe({
    //   next: (res: any) => {
    //     if (res.code == 200) {
    //       this.loader.dismiss();
    //        this.toastService.presentToast("Updated");
    //     }
    //     else {
          
    //     }
    //     this.loader.dismiss();
    //   },
    //   error: (error: any) => {
    //     this.loader.dismiss();
    //   }
    // });
  }

}
