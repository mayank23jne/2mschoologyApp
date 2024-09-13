import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ClassRoutineAddPage } from '../class-routine-add/class-routine-add.page';


@Component({
  selector: 'app-class-routine-info',
  templateUrl: './class-routine-info.page.html',
  styleUrls: ['./class-routine-info.page.scss'],
})
export class ClassRoutineInfoPage implements OnInit {

  heading_title: any;
  routineData: any =[];
  formData:any;
  role:any;
  constructor(private toastService: ToastService,private data: DataService,private loader: LoaderService,private fetch: SchoolDataService,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.formData = new FormData();
    this.formData.append('class_id', this.navParams.get('class_id'));
    this.formData.append('section_id', this.navParams.get('section_id'));
    this.formData.append('day', this.navParams.get('day'));
    this.list(this.formData);
  }
  list(formData:any){
      this.loader.present();
      this.fetch.getAllRoutineData(formData).subscribe({
       
        next:(res:any) => {
        if(res.code == 200){
          this.loader.dismiss();
            this.routineData = res.data;
          }
          else{
            this.routineData = [];
          }
          this.loader.dismiss();
        },
        error: (error:any) => {
          this.loader.dismiss();
        }
      });
    }
  closeModal() {
    this.modalController.dismiss();
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteClassRoutine(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.modalController.dismiss();
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
      component: ClassRoutineAddPage,
      cssClass: '',
      componentProps: {
        title: "Edit Class Routine",
        editDataId:item.id
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
}
