import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddMasterPage } from '../modals/add-master/add-master.page';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {

 
  departmentList:any;
  search:any;
  formData:any;  
  role:any;
  
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}
  
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.formData = new FormData();
    this.list(this.formData);
  }
  
  list(data:any){
    this.loader.present();
    this.fetch.viewDepartment(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.departmentList = res.data;
        }
        else{
          this.departmentList = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  
  searchRes() {
    this.formData = new FormData();
    this.departmentList= this.departmentList.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
  }
  
  searchCancel(){
    this.search = "";
    this.formData = new FormData();
    this.list(this.formData);
  }
  
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteDepartment(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ngOnInit();
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
        title: "Edit Department",
        module_name:'dept',
        editDeptData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Department",
        module_name:'dept'
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ngOnInit();
    });
    return await modal.present();
  }

}
