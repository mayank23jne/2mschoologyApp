import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { ClassRoutineInfoPage } from '../modals/class-routine-info/class-routine-info.page';
import { ClassRoutineAddPage } from '../modals/class-routine-add/class-routine-add.page';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
  user_id: any;
  classList: any;
  showWeekList: boolean = false;
  role: any;
  class_id: any;
  section_id: any;
  weekDays: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  constructor(private cdr: ChangeDetectorRef, private data: DataService, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user_id = localStorage.getItem("userId");
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges();
    });
  }

  async openDetailModal(day: any) {
    const modal = await this.modalController.create({
      component: ClassRoutineInfoPage,
      cssClass: '',
      componentProps: {
        title: "Class Routine",
        section_id: this.section_id,
        class_id: this.class_id,
        day: day
      }
    });
    modal.onDidDismiss().then((dataReturned) => {

    });

    return await modal.present();
  }
 
  async openAddModal() {
    const modal = await this.modalController.create({
      component: ClassRoutineAddPage,
      cssClass: '',
      componentProps: {
        title: "Add Class Routine",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }

  onFilterChange(event: { class: string, section: string, student_id: any }) {
    this.class_id = event.class;
    this.section_id = event.section;
    this.showWeekList = true;
  }

}
