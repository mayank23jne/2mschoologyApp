import { Component, OnInit } from '@angular/core';
import { StudentInfoPage } from '../../modals/student-info/student-info.page';
import { ModalController } from '@ionic/angular';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StudentEditPage } from '../../modals/student-edit/student-edit.page';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  user_id:any;
  formData:any;
  role:any;
  imgPath:any;
  demoimgPath:any = "../../assets/profile_img.png";
  studentData:any;
  studentDetail:any;
  search:any = "";

  constructor(private data: DataService,private fetch: SchoolDataService,private loader: LoaderService,private modalController: ModalController) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.user_id = localStorage.getItem("userId");
  }

  ionViewDidEnter(){
    this.loader.present();
    this.list();
    this.search = "";
  }
  
  async openDetailModal(id: any) {
    if(this.studentData){
    const modal = await this.modalController.create({
      component: StudentInfoPage,
      componentProps: {
        title: 'Student Info',
        id:id,
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      const formData = new FormData();
      this.list();
    });
    return await modal.present();
  }
  }
  list(){
    this.fetch.studentData().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
         this.studentData = res.data;
        }
        else{
          this.studentData = "";
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
    this.studentData = this.studentData.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  searchCancel(){
    this.search = "";
    this.list();
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: StudentEditPage,
      cssClass: '',
      componentProps: {
        title: "Add Student"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }
  
}
