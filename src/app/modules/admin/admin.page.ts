import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AdminMasterPage } from '../modals/admin-master/admin-master.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminsList:any;
  search:any;
  formData:any;  
  role:any;
  
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}
  
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.list();
  }
  
  list(){
    this.loader.present();
    this.fetch.adminList().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.adminsList = res.data;
        }
        else{
          this.loader.dismiss();
          this.adminsList = "";
        }
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  
  searchRes() {
    this.formData = new FormData();
    this.adminsList= this.adminsList.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
  }
  
  searchCancel(){
    this.search = "";
    this.formData = new FormData();
    this.list();
  }
  
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.adminDelete(formData).subscribe({
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
  
  async openEditModal(item:any) {
    console.log(item);
    const modal = await this.modalController.create({
      component: AdminMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit Admin",
        dataAdmin:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.list();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AdminMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Admin",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.list();
    });
    return await modal.present();
  }

  

}
