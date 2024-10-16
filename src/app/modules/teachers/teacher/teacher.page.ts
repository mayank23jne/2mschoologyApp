import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddTeacherPage } from '../../modals/add-teacher/add-teacher.page';
import { ModalController } from '@ionic/angular';
import { UploadCsvMasterPage } from '../../modals/upload-csv-master/upload-csv-master.page';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {
  teacherData:any;
  user_id:any;
  formData:any;
  search:any;
  role:any;
  constructor(private modalController: ModalController,private toastService: ToastService,private data: DataService,private loader: LoaderService,private fetch: SchoolDataService) { }
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.user_id = localStorage.getItem("userId");
    
    this.formData = new FormData();
    this.list(this.formData);
  }
  searchRes() {
    this.formData = new FormData();
    this.formData.append('search_name', this.search);
    this.list(this.formData);
  }
  searchCancel(){
    this.search = "";
    this.searchRes();
  }
  list(formData:any){
    this.loader.present();
    this.fetch.getAllTeachersData(formData).subscribe({
      next:(res:any) => {
      if(res){
        this.loader.dismiss();
        if(res.code == 200){
        this.teacherData = res.data;
        }
        else{
          this.teacherData = "";
        }
      }
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
      this.fetch.deleteTeacherMaster(formData).subscribe({
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
    component: AddTeacherPage,
    cssClass: '',
    componentProps: {
      title: "Edit Teacher",
      editTeacherData:item
    }
  });
  modal.onDidDismiss().then((dataReturned:any) => {
    this.ionViewDidEnter();
  });

  return await modal.present();
}

async openAddModal() {
  const modal = await this.modalController.create({
    component: AddTeacherPage,
    cssClass: '',
    componentProps: {
      title: "Add Teacher"
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
      title: "Add teacher by CSV",
      module:'teacher'
    }
  });

  modal.onDidDismiss().then(() => {
    
  });

  return await modal.present();
}

}
