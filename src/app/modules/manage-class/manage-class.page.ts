import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddMasterPage } from '../modals/add-master/add-master.page';
import { UploadCsvMasterPage } from '../modals/upload-csv-master/upload-csv-master.page';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.page.html',
  styleUrls: ['./manage-class.page.scss'],
})
export class ManageClassPage implements OnInit {
classList:any;
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
  this.fetch.viewClass(data).subscribe({
    next:(res:any) => {
    if(res.code == 200){
      this.loader.dismiss();
        this.classList = res.data;
      }
      else{
        this.classList = "";
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
  this.classList = this.classList.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
}

searchCancel(){
  this.search = "";
  this.formData = new FormData();
  this.formData.append('user_type', this.role);
  this.list(this.formData);
}

delete(id: any) {
  this.data.presentAlertConfirm().then((res) => {
    if (res == true) {
      const formData = new FormData();
      formData.append('id', id);
      this.fetch.deleteClass(formData).subscribe({
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
      title: "Edit class",
      module_name:'class',
      editClassData:item
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
      title: "Add Class",
      module_name:'class'
    }
  });
  modal.onDidDismiss().then((dataReturned) => {
  });
  return await modal.present();
}
async openExcelModal() {
  const modal = await this.modalController.create({
    component: UploadCsvMasterPage,
    cssClass: '',
    componentProps: {
      title: "Add Class by CSV",
      module:'class'
    }
  });

  modal.onDidDismiss().then(() => {
    
  });

  return await modal.present();
}

}
