import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';


@Component({
  selector: 'app-class-routine-info',
  templateUrl: './class-routine-info.page.html',
  styleUrls: ['./class-routine-info.page.scss'],
})
export class ClassRoutineInfoPage implements OnInit {

  heading_title: any;
  routineData: any =[];
   formData:any;

  constructor(private loader: LoaderService,private fetch: SchoolDataService,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');

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
  
}
