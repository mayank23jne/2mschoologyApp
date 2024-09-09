import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddSyllabusPage } from '../modals/add-syllabus/add-syllabus.page';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {

  user_id: any;
  classList: any;
  syllabusData: any = [];
  formData: any;
  role: any;
  class_id: any;
  section_id: any = "";
  search: any = "";
  downloading: any;
  progress: any;
  constructor(private http: HttpClient, ngZone: NgZone, private cdr: ChangeDetectorRef, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {
    Filesystem.addListener('progress', (progressStatus) => {
      ngZone.run(() => {
        this.progress = progressStatus.bytes / progressStatus.contentLength;
      });
    });
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges();
    });

    this.formData = new FormData();
    this.user_id = localStorage.getItem("userId");
    this.formData.append('user_id', this.user_id);
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddSyllabusPage,
      cssClass: '',
      componentProps: {
        title: "Add Syllabus"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.formData.append('class_id', this.class_id);
      this.formData.append('section_id', this.section_id);
      this.list(this.formData);
    });

    return await modal.present();
  }

  onFilterChange(event: { class: string, section: string, student_id: any }) {
    this.formData = new FormData();
    this.class_id = event.class;
    this.section_id = event.section;

    this.formData.append('class_id', this.class_id);
    this.formData.append('section_id', this.section_id);
    this.formData.append('student_id', event?.student_id);
    this.list(this.formData);
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('syllabus_id', id);
        this.fetch.syllabusDelete(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.formData.append('class_id', this.class_id);
              this.formData.append('section_id', this.section_id);
              this.list(this.formData);
              this.toastService.presentToast(res.response);
            } else {
              this.toastService.presentErrorToast(res.response);
            }
          },
          error: (error: any) => {
          }
        });
      }
    });
  }
  list(formData: any) {
    this.loader.present();
    this.fetch.getAllSyllabusData(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.syllabusData = res.data;
        }
        else {
          this.syllabusData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {
    this.formData.append('search_title', this.search);
    this.list(this.formData);
  }
  searchCancel() {
    this.search = "";
    this.searchRes();
  }
  generateUniqueFileName(baseName: any) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); 
    return `${baseName}_${timestamp}`;
  }
  download_pdf(fileUrl: any) {

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
          const fileExtension = this.getFileExtension(fileUrl);

          if (!fileExtension) {
            throw new Error('Unable to extract file extension');
          }

          const fileName = this.generateUniqueFileName('Syllabus') + fileExtension;
          try {
            const result = await Filesystem.writeFile({
              path: fileName,
              data: base64data,
              directory: Directory.Documents,
            });
            this.downloading = false;
            this.loader.dismiss();
            this.toastService.presentToast('Syllabus Downloaded In Your Device');
          } catch (error) {
            console.error('Failed to save file:', error);
          }
        };
      });
    } else {
      this.loader.dismiss();
      this.toastService.presentErrorToast('Syllabus link not available');
    }
  }

  getFileExtension(fileUrl: string): string {
    const fileParts = fileUrl.split('.');
    return fileParts.length > 1 ? `.${fileParts.pop()}` : '.bin'; 
  }


}
