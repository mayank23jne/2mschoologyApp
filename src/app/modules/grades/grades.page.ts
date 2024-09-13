import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddExamMasterPage } from '../modals/add-exam-master/add-exam-master.page';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  grades_data: any = [];
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
    this.formData = new FormData();
    this.list(this.formData);
  }
  list(formData: any) {
    this.loader.present();
    this.fetch.grades(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          this.grades_data = res.data;
        }
        else {
          this.grades_data = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {
    this.formData.append('search_name', this.search);
    this.list(this.formData);
  }
  searchCancel() {
    this.search = "";
    this.searchRes();
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteGrade(formData).subscribe({
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
        title: "Edit Grade",
        module_name:'grade',
        editGradeData:item
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
        title: "Add Grade",
        module_name:'grade'
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });
    return await modal.present();
  }

}
