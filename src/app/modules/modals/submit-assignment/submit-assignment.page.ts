import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.page.html',
  styleUrls: ['./submit-assignment.page.scss'],
})
export class SubmitAssignmentPage implements OnInit {
  homeworkId: any;
  homeworkData: any;
  fileData: any;
  img: any;
  imagepath: any;
  pdfSrc: any;
  filename: any;
  role: any;
  studentHomeworkData: any;
  student_id: any;
  parentHomeworkData: any;
  downloading: any;
  src: any;
  safeUrl: SafeResourceUrl | undefined;
  constructor(private iab: InAppBrowser, private sanitizer: DomSanitizer, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private navParams: NavParams, private modalController: ModalController) {
  }

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + '/pdf');
    this.homeworkId = this.navParams.get('id');
    this.homeworkData = this.navParams.get('item');

    this.student_id = localStorage.getItem("userId");
    this.role = localStorage.getItem("role");
  }
  generateUniqueFileName(baseName: any) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    return `${baseName}_${timestamp}`;
  }
  closeModal() {
    this.modalController.dismiss();
  }

  loadProfileFromDevice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileData = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileData = "";
    }
  }

  submit() {
    if (this.fileData) {
      let data = { 'homework_file': this.fileData, 'homework_id': this.homeworkId };
      this.loader.dismiss();
      this.fetch.uploadhomework(data).subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.toastService.presentToast(res.response);
            this.fileData = "";
            this.loader.dismiss();
            this.closeModal();
          }
        },
        error: (error: any) => {
          this.toastService.presentErrorToast(error);
          this.loader.dismiss();
        }
      });
    } else {
      this.toastService.presentErrorToast("Assignment file not found");
    }

  }
  async downloadAndOpenFile(fileUrl: string) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    fileUrl = fileUrl + '?v=' + `${timestamp}`;
    await Browser.open({ url: fileUrl });
  }
  getFileExtension(fileUrl: string): string {
    const fileParts = fileUrl.split('.');
    return fileParts.length > 1 ? `.${fileParts.pop()}` : '.bin'; 
  }
  async open(fileUrl: any) {
    const options: any = {
      location: 'no',
      toolbar: 'no',
      hideurlbar: 'yes'
    };
    const fileName = this.homeworkData?.file_name;
    const pageno = this.homeworkData?.page_number;
    const pageNumber = pageno && pageno.includes(',') ? pageno.split(',')[0] : pageno;
    fileUrl = `https://2mschoology.com/api/pdf/${fileName}/${pageNumber}`;
    const browser = this.iab.create(fileUrl, '_self', options);
    browser.show();
  }
 
}
