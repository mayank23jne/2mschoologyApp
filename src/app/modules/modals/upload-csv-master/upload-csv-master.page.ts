import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ImagePreviewPage } from '../image-preview/image-preview.page';

@Component({
  selector: 'app-upload-csv-master',
  templateUrl: './upload-csv-master.page.html',
  styleUrls: ['./upload-csv-master.page.scss'],
})
export class UploadCsvMasterPage implements OnInit {
  
  heading_title:any;

  formData: any;
  class_id:any;
  section_id:any;
  fileData:any;
  excel_file_url:any;
  preview_file:any;
  downloading:boolean = false;
  module:any;

  constructor(private http: HttpClient,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private data: DataService,private router: Router,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {

    this.heading_title = this.navParams.get('title');
    this.module = this.navParams.get('module');

    this.formData = new FormData();

    if(this.module == 'parent'){
      this.formData.append('type', "parent");
    }
    if(this.module == 'class'){
      this.formData.append('type', "class");
    }
    if(this.module == 'teacher'){
      this.formData.append('type', "teacher");
    }

    this.fetch.getExcelData(this.formData).subscribe({
            next: (res: any) => {
              if (res.code == 200) {
                this.excel_file_url = res.data?.excel_file;
                this.preview_file = res.data?.excel_preview; 
              } 
            },
          error: (error: any) => {
        }
    });
          
  }

  closeModal() {
    this.modalController.dismiss();
  }
  onFilterChange(event: { class: string, section: string, student_id: any }) {
    this.class_id = event?.class;
    this.section_id = event?.section;
  }
  loadProfileFromDevice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    this.fileData  = inputElement?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       
      };
      reader.readAsDataURL(file);
    } else {
      
    }
  }
  submit(){
    this.formData = new FormData();
    this.formData.append('csv_file', this.fileData);
    this.formData.append('type', this.module);
    this.fetch.addExcelData(this.formData).subscribe({
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
  generateCSV() {
   
    let fileUrl = this.excel_file_url;
    console.log(fileUrl);
    this.downloading = true;

    this.loader.present();
    if (fileUrl) {
      this.http.get(fileUrl, { responseType: 'blob' }).subscribe(async (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          let base64data = reader.result as string;

          const base64Prefix = ';base64,';
          const base64Index = base64data.indexOf(base64Prefix);
          if (base64Index !== -1) {
            base64data = base64data.substring(base64Index + base64Prefix.length);
          }
          const fileName = this.generateUniqueFileName('Student') + '.csv';
          try {
            const result = await Filesystem.writeFile({
              path: fileName,
              data: base64data,
              directory: Directory.Documents,
            });
            this.downloading = false;
            this.loader.dismiss();
            this.toastService.presentToast('File downloaded succesfully');
          } catch (error) {
            console.error('Failed to save file:', error);
          }
        };
      });
    } else {
      this.loader.dismiss();
      this.toastService.presentErrorToast('link not available');
    }

  }
  generateUniqueFileName(baseName: any) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); 
    return `${baseName}_${timestamp}`;
  }

  async preview(){
    let url = this.preview_file;
    console.log(url);
    const modal = await this.modalController.create({
      component: ImagePreviewPage,
      cssClass: '',
      componentProps: {
        title: "Excel data preview",
        url:url
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
    
  }
}
