import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { CreateProgressReportPage } from '../modals/create-progress-report/create-progress-report.page';
import { ToastService } from 'src/app/core/services/toast.service';
import { EditProgressReportPage } from '../modals/edit-progress-report/edit-progress-report.page';

@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.page.html',
  styleUrls: ['./progress-report.page.scss'],
})
export class ProgressReportPage implements OnInit {

  role: any;
  user_id: any;
  detail: any = [];

  constructor(private cdr: ChangeDetectorRef, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.user_id = localStorage.getItem("userId");
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges();
    });

    this.loader.present();
    this.list();
  }
  async openAddModal() {
    const modal = await this.modalController.create({
      component: CreateProgressReportPage,
      cssClass: '',
      componentProps: {
        title: "Create Progress Report"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });

    return await modal.present();
  }
  async openEditModal(id: any) {
    const modal = await this.modalController.create({
      component: EditProgressReportPage,
      cssClass: '',
      componentProps: {
        title: "Edit Progress Report",
        id: id
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ngOnInit();
    });

    return await modal.present();
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('progress_id', id);
        this.fetch.progressReportDelete(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.list();
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

  list() {
    this.fetch.progressReportList().subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res.code == 200) {
          this.loader.dismiss();
          this.detail = res.data;
          console.log(this.detail);
        }
        else {
          this.detail = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
}
