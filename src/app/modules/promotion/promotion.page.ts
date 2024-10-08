import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage implements OnInit {

  currentYear:any;
  current_sessions: any = [];
  next_sessions: any = [];
  selectedCurrentSession:any = "";
  selectedNextSession:any = "";
  classList:any;
  selectedFromClass:any = "";
  selectedToClass:any = "";
  promotionList:any = [];
  sessionData:any;

  constructor(private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    // this.current_sessions = [this.currentYear.toString()];
    // this.next_sessions = [(this.currentYear + 1).toString()];
    this.current_sessions = ['2021'];
    this.next_sessions = ['2021'];
    this.sessionList();
    this.list();
  }

  list(){
    this.fetch.viewClass().subscribe({
      next:(res:any) => {
      if(res.code == 200){
          this.classList = res.data;
        }
        else{
          this.classList = "";
        }
      },
      error: (error:any) => {
       
      }
    });
  }
  sessionList(){
    this.fetch.activeSession().subscribe({
      next:(res:any) => {
      if(res.code == 200){
          this.sessionData = res.data;
          console.log(this.sessionData);
        }
        else{
          this.sessionData = "";
        }
      },
      error: (error:any) => {
       
      }
    });
  }

manage_promotion(){

  // console.log(this.selectedCurrentSession);
  // console.log(this.selectedNextSession);
  // console.log(this.selectedFromClass);
  // console.log(this.selectedToClass);
  let formdata = { 
    "session_from": this.selectedCurrentSession.id,
    "session_to": this.selectedNextSession.id,
    "class_id_from": this.selectedFromClass,
    "class_id_to": this.selectedToClass
  }
  this.loader.present();
  this.fetch.viewPromotion(formdata).subscribe({
    next:(res:any) => {
    if(res.code == 200){
      this.loader.dismiss();
       this.promotionList = res.data;
      }
      else{
        this.promotionList = [];
      }
      this.loader.dismiss();
    },
    error: (error:any) => {
      this.loader.dismiss();
    }
  });

}
promote(studentDetail:any,class_id:any){
  let formdata = { 
    "enroll_id": studentDetail?.enrolment_id,
    "class_id":class_id,
    "session_id": this.selectedNextSession?.id
}
this.loader.present();
this.fetch.updatePromotion(formdata).subscribe({
  next:(res:any) => {
  if(res.code == 200){
    this.loader.dismiss();
    
     this.toastService.presentToast(res.response);
    }
    else{
      this.toastService.presentToast(res.response);
    }
    this.loader.dismiss();
  },
  error: (error:any) => {
    this.loader.dismiss();
  }
});
}
}
