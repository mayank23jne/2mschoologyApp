import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddMasterPage } from '../modals/add-master/add-master.page';

@Component({
  selector: 'app-events-calender',
  templateUrl: './events-calender.page.html',
  styleUrls: ['./events-calender.page.scss'],
})
export class EventsCalenderPage implements OnInit {
  selectedDate: any;
  viewTitle: any = '';
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  }
  user_id: any;
  eventData: any;
  formData: any;
  current_date: any;
  events: any[] = [];
  events_data: any;
  role:any;
  
  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}
  
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
   }
  ionViewDidEnter() {
   
    this.formData = new FormData();
    this.current_date = this.calendar.currentDate.toISOString().split('T')[0];
    this.user_id = localStorage.getItem("userId");
    this.formData.append('user_id', this.user_id);
    this.formData.append("selected_date", this.current_date);
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth() + 1;
    this.formData.set("month", month);
    this.formData.set("year", year);
    this.eventList(this.formData);
  }

  calendarBack() {
    this.myCal.slidePrev();
  }
  calendarForward() {
    this.myCal.slideNext();
  }
  setToday() {
    this.myCal.currentDate = new Date();
  }

  onDateSelected(event: any) {
    this.selectedDate = event?.selectedTime;
    this.fetchEvents(this.selectedDate);
  }

  fetchEvents(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];
    this.formData?.set("selected_date", formattedDate);
  }
  eventList(formData: any) {
    this.loader.present();
    this.fetch.calendarEventData(formData).subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res.code == 200) {
          
          this.events_data = res.data;
          
          this.events = res.data.map((event: { title: any; starting_date: string | number | Date; ending_date: string | number | Date; }) => ({
            title: event.title,
            startTime: new Date(event.starting_date),
            endTime: new Date(event.ending_date),
            allDay: false
          }));

        }
        else {
          this.eventData = "";
        }

      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  delete(id: any) {
    console.log(id);
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('id', id);
        this.fetch.deleteEventCalendarMaster(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ionViewDidEnter();
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
        title: "Edit Event",
        module_name:'event',
        editEventData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ionViewDidEnter();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddMasterPage,
      cssClass: '',
      componentProps: {
        title: "Add Event",
        module_name:'event'
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });
    return await modal.present();
  }
}
