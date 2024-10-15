import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { StudentEditPage } from '../student-edit/student-edit.page';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.page.html',
  styleUrls: ['./student-info.page.scss'],
})
export class StudentInfoPage implements OnInit {
  heading_title:any;
  detail:any;
  student_id:any;
  studentData:any;
 
  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private data: DataService,private router: Router,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.heading_title = this.navParams.get('title');
    this.studentData = this.navParams.get('studentData');
    this.student_id =  this.studentData.student_id;
    console.log(this.student_id);
    
    this.list();
  }
  async openEditModal(){
    const modal = await this.modalController.create({
      component: StudentEditPage,
      cssClass: '',
      componentProps: {
        title:"Edit Student",
        id:this.student_id,
        studentData:this.detail
      }
      });
      modal.onDidDismiss().then((dataReturned) => {

        this.modalController.dismiss();
      });
  
    return await modal.present();
  }
  delete(id:any) {

    this.data.presentAlertConfirm().then((res: any) => {
      if(res == true){
        const formData = new FormData();
        formData.append('student_id', this.student_id);
        this.fetch.studentDelete(formData).subscribe({
          next:(res:any) => {
            if(res.code == 200){
              this.toastService.presentToast(res.response);
              this.loader.dismiss();  
            }else{
              this.toastService.presentErrorToast(res.response);
            }
          },
          error: (error:any) => {
          }
        });
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
 
  list(){
      const formData = new FormData();
      formData.append('student_id', this.student_id);
      this.fetch.getStudentDetail(formData).subscribe({
        next:(res:any) => {
        if(res.code == 200){
          this.loader.dismiss();
          this.detail = res.data;

            console.log(this.detail);

          }
          else{
            this.detail = [];
          }
          this.loader.dismiss();
        },
        error: (error:any) => {
          this.loader.dismiss();
        }
      });
    }
}

