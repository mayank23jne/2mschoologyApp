import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { AddExamMasterPage } from '../modals/add-exam-master/add-exam-master.page';
import { ToastService } from 'src/app/core/services/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {
  user_id: any;
  exam_data: any;
  formData: any;
  search: any;
  role:any;
  constructor(private modalController: ModalController,private toastService: ToastService,private fetch: SchoolDataService, private loader: LoaderService, private data: DataService) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
  }

  ionViewDidEnter() {
    this.user_id = localStorage.getItem("userId");
    this.formData = new FormData();
    this.formData.append('user_id', this.user_id);
    this.list();
  }

  list(formData: any = "") {
    this.loader.present();
    this.fetch.examData(formData = "").subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res) {
          this.exam_data = res.data;
        }
        else {
          this.exam_data = "";
        }

      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {

    this.exam_data = this.exam_data.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.search.toLowerCase()));

  }

  searchCancel() {
    this.search = "";
    this.list();
  }

  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteExamMaster(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ionViewDidEnter();
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
  
  async openEditModal(item:any) {
    const modal = await this.modalController.create({
      component: AddExamMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit Exam",
        module_name:'exam',
        editExamData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ionViewDidEnter();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddExamMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Exam",
        module_name:'exam'
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });
    return await modal.present();
  }
}
