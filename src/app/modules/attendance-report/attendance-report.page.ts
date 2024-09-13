import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TakeAttendancePage } from '../modals/take-attendance/take-attendance.page';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.page.html',
  styleUrls: ['./attendance-report.page.scss'],
})
export class AttendanceReportPage implements OnInit {

  user_id: string | null = null;
  role: string | null = null;
  years: any[] = [];
  months: any[] = [];
  class_id: any;
  section_id: any;
  selected_month: number = new Date().getMonth() + 1;
  selected_year: number = new Date().getFullYear();
  student_id: any;
  selectedDate: Date | null = null;
  attendanceData: any[] = [];
  daysInMonth: number[] = [];
  studentData:any;
  selectedStudentData:any;
  constructor(
    private cdr: ChangeDetectorRef,
    private loader: LoaderService,
    private fetch: SchoolDataService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.initializeUserData();
    this.yearlist();
    this.monthlist();
    this.studentList();
  }

  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  initializeUserData() {
    this.user_id = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
  }

  onDateSelected(event: any) {
    this.selectedDate = event.selectedTime;
  }

  generateDaysInMonth() {
    const days = new Date(this.selected_year, this.selected_month, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
  }

  getAttendanceStatus(student: { attendance: any[] }, day: number): string {
    const attendanceRecord = student.attendance.find(
      (record) => new Date(record.date).getDate() === day
    );
    return attendanceRecord ? attendanceRecord.status : '';
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: TakeAttendancePage,
      cssClass: '',
      componentProps: { title: 'Take attendance' },
    });

    modal.onDidDismiss().then(() => {
      this.filter();
    });

    return await modal.present();
  }

  yearlist() {
    
    this.fetch.getYear().subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.years = res.data;
        } else {
          this.years = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching years:', error);
       
      },
    });
  }

  monthlist() {
    
    this.fetch.getMonths().subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.months = res.data;
        } else {
          this.months = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching months:', error);
      },
    });
  }
  studentList(){
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

  onFilterStudentChange(){
    this.student_id = this.selectedStudentData;
  }
  filter() {
    this.loader.present();
    this.generateDaysInMonth();
    const arg_data = { month: this.selected_month, year: this.selected_year, student_id: this.student_id };
    this.loadEvents(arg_data);
  }

  getEventColor(event: any): string {
    return event.status === '1' ? 'green' : event.status === '0' ? 'red' : 'white';
  }

  onTimeSelected(ev: { selectedTime: any }) {
    console.log('Selected time:', ev.selectedTime);
  }

  loadEvents(arg_data: any) {

    this.fetch.getAttendanceReport(arg_data).subscribe({
      next: (res: any) => {
        if (res.code === 200 && res.data) {
          this.attendanceData = res.data;
        } else {
          this.attendanceData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        console.error('Error fetching attendance data:', error);
        this.attendanceData = [];
        this.loader.dismiss();
      },
    });
  }

}
