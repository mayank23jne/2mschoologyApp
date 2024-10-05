import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { AddPlanMasterPage } from '../modals/add-plan-master/add-plan-master.page';

@Component({
  selector: 'app-plan-settings',
  templateUrl: './plan-settings.page.html',
  styleUrls: ['./plan-settings.page.scss'],
})
export class PlanSettingsPage implements OnInit {

  plansList:any;
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
    this.fetch.viewPlan().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.plansList = res.data;
        }
        else{
          this.plansList = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  
  searchRes() {
    this.loader.present();
    this.loader.dismiss();
    this.formData = new FormData();
    this.plansList= this.plansList.filter((item: { plan_name: string }) => item.plan_name.toLowerCase().includes(this.search.toLowerCase()));
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
        formData.append('plan_id', id);
        this.fetch.deletePlanSetting(formData).subscribe({
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
    const modal = await this.modalController.create({
      component: AddPlanMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit plan",
        dataPlan:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.list();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddPlanMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add plan",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.list();
    });
    return await modal.present();
  }

}
