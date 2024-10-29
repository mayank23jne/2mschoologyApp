import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddMasterPage } from '../modals/add-master/add-master.page';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  
  class_id:any;
  subjects:any = [];
  user_id:any;
  formData:any;
  search:any;
  role:any;
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}
  
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });

  }
  ionViewDidEnter(){
    this.user_id = localStorage.getItem("userId");
  }
  onFilterChange(event: { class: string }) {
    this.class_id = event?.class;
    this.formData = new FormData();
    this.formData.append('user_id', this.user_id);
    this.formData.append('class_id', this.class_id);
    this.list(this.formData);
  }
  list(formData:any){
    this.loader.present();
    this.fetch.subjectList(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.subjects = res?.data;
          this.ionViewDidEnter();
        }
        else{
          this.subjects = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {
    this.formData.append('search_name', this.search);
    this.list(this.formData);
  }
  searchCancel(){
    this.search = "";
    this.searchRes();
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteSubject(formData).subscribe({
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
    });
  }
  
  async openEditModal(item:any) {
    const modal = await this.modalController.create({
      component: AddMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit Subject",
        module_name:'subject',
        editSubjectData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.formData = new FormData();
      this.formData.append('user_id', this.user_id);
      this.formData.append('class_id', this.class_id);
      this.list(this.formData);
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Subject",
        module_name:'subject'
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
}
