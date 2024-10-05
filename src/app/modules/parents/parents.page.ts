import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { SchoolDataService } from '../../core/services/school-data.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddUserMasterPage } from '../modals/add-user-master/add-user-master.page';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UploadCsvMasterPage } from '../modals/upload-csv-master/upload-csv-master.page';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {
  demoimgPath: any = "../../assets/profile_img.png";
  parentData: any;
  user_id: any;
  formData: any;
  search: any;
  role:any;
  constructor(private toastService: ToastService,private data: DataService,private modalController: ModalController,private loader: LoaderService, private fetch: SchoolDataService, public router: Router) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.formData = new FormData();
    if(this.role == "admin"){
      this.formData.append('user_type', "parent");
      this.adminParentList( this.formData);
    }else{
      this.list();
    }
  }
  searchRes() {
    this.formData = new FormData();
    this.parentData = this.parentData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.search.toLowerCase()));
  }
  searchCancel() {
    this.search = "";
    if(this.role == "admin"){
      this.formData.append('user_type', "parent");
      this.adminParentList( this.formData);
    }else{
      this.list();
    }
  }
  list() {
    this.loader.present();
    this.fetch.parentsData().subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          if (res.code == 200) {
            this.parentData = res.data;
          }
          else {
            this.parentData = "";
          }
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  adminParentList(data:any){
      this.loader.present();
      this.fetch.viewUserMaster(data).subscribe({
        next:(res:any) => {
        if(res.code == 200){
          this.loader.dismiss();
            this.parentData = res.data;
          }
          else{
            this.parentData = "";
          }
          this.loader.dismiss();
        },
        error: (error:any) => {
          this.loader.dismiss();
        }
      });
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('user_type', 'parent');
        this.fetch.userDelete(formData).subscribe({
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
      component: AddUserMasterPage,
      cssClass: '',
      componentProps: {
        title: "Edit parent",
        addUserType:'parent',
        editUserData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddUserMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Parent",
        addUserType: "parent"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  async openExcelModal() {
    const modal = await this.modalController.create({
      component: UploadCsvMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Parent by CSV",
        module:'parent'
      }
    });

    modal.onDidDismiss().then(() => {
      
    });

    return await modal.present();
  }

}
