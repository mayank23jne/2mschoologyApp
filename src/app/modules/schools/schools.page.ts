import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { SchoolMasterPage } from '../modals/school-master/school-master.page';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {
  schoolList:any;
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
    this.fetch.viewSchool().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.schoolList = res.data;
        }
        else{
          this.schoolList = "";
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
    this.schoolList= this.schoolList.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
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
        this.fetch.schoolDelete(formData).subscribe({
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
      component: SchoolMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit school",
        dataSchool:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.list();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: SchoolMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add school",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.list();
    });
    return await modal.present();
  }


}
