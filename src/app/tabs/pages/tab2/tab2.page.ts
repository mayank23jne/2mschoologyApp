import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddAssignmentPage } from 'src/app/modules/modals/add-assignment/add-assignment.page';
import { EditAssignmentPage } from 'src/app/modules/modals/edit-assignment/edit-assignment.page';
import { SubmitAssignmentPage } from 'src/app/modules/modals/submit-assignment/submit-assignment.page';
import { ViewAssignmentPage } from 'src/app/modules/modals/view-assignment/view-assignment.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  formData: any;
  user_id: any;
  homeworkData: any = [];
  role: any;
  search: any;

  constructor(private cdr: ChangeDetectorRef, private toastService: ToastService, private data: DataService, private fetch: SchoolDataService, private loader: LoaderService, private modalController: ModalController) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges();
    });
    this.formData = new FormData();
    this.user_id = localStorage.getItem("userId");
    
    this.list();
  }
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddAssignmentPage,
      cssClass: '',
      componentProps: {
        title: "Add assignment"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });

    return await modal.present();
  }
  async openEditModal(id: any) {
    const modal = await this.modalController.create({
      component: EditAssignmentPage,
      cssClass: '',
      componentProps: {
        title: "Edit assignment",
        id: id
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });

    return await modal.present();
  }
  async openViewModal(item: any) {
    const modal = await this.modalController.create({
      component: SubmitAssignmentPage,
      cssClass: '',
      componentProps: {
        title: "Submit assignment",
        id: item.id,
        item: item
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });

    return await modal.present();
  }
  async openViewTeacherModal(id: any) {

    const modal = await this.modalController.create({
      component: ViewAssignmentPage,
      cssClass: '',
      componentProps: {
        title: "View assignment",
        id: id
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });

    return await modal.present();
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('homework_id', id);
        this.fetch.deleteHomeWork(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.list(this.formData);
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
  list(formData: any = "") {
    this.loader.present();
    this.fetch.getHomeworkData(formData).subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res.code == 200) {
          this.homeworkData = res.data;
          this.homeworkData.forEach((element: any, index: any) => {
            if (element.last_date) {
              element.last_date = this.data.convertDate(element.last_date);
            }
            if (element.created_date) {
              element.created_date = this.data.convertDate(element.created_date);
            }
          });
        }
        else {
          this.homeworkData = [];
        }

      },
      error: (error: any) => {
        this.loader.dismiss();
        if (error.status === 500) {
          this.toastService.presentErrorToast('An internal server error occurred. Please try again later.');
        } else {
          this.toastService.presentErrorToast('An error occurred. Please try again.');
        }
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

}
