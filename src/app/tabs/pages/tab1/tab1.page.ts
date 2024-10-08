import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UnpaidInvoiceListPage } from 'src/app/modules/modals/unpaid-invoice-list/unpaid-invoice-list.page';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { InvoiceChartPage } from 'src/app/modules/modals/invoice-chart/invoice-chart.page';
Chart.register(...registerables);


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  @ViewChild('barChartCanvas') private barChartCanvas: any;

  barChart: any;

  dashboardData: any = [];
  user_id: any;
  teachersCount: any;
  studentsCount: any;
  total_attendance: any;
  role: any;
  parents: any;
  event_list: any;
  childrens: any = "";
  progress: any = "";
  school_name: any;
  dateRange:any;
  constructor(private datePipe: DatePipe,private modalController: ModalController,private toastService:ToastService,private cdr: ChangeDetectorRef, private alertController: AlertController, private data: DataService, private fetch: SchoolDataService, private loader: LoaderService, private platform: Platform, public router: Router, private navCtrl: NavController, private menu: MenuController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
  }
  ngAfterViewInit() {
    if(this.role == 'admin'){
    setTimeout(() => {
      this.createBarChart();
    }, 5000);
  }
   
  }
  
  ionViewDidEnter() {
    this.loader.present();
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges(); // Trigger change detection
    });

    this.menu.enable(true, 'start');
    const formData = new FormData();
    this.user_id = localStorage.getItem("userId");
    this.dashboardData = [];
    this.list();
  }
  onChange(event: any) {
    const formData = new FormData();
    formData.append('student_id', event.target.value);
    this.list(formData);
  }
  handleBackButton() {
    const currentUrl = this.router.url;
    if (currentUrl === '/tabs/tab1') {
      this.showExitConfirmationAlert();
    } else {
      this.navCtrl.back();
    }
  }

  async showExitConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });

    await alert.present();
  }
  list(formData: any = "") {
    this.fetch.getDashboardData(formData).subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        
        if (res.code == 200) {
          this.dashboardData = res.data;
          this.school_name = res.data.school_name;
          this.childrens = res.student;
  
          if (res.data?.progress) {
            this.progress = res.data?.progress[0];
            if (this.role == 'student') {
              this.progress = res.data?.progress;
            }
          } else {
            this.progress = "";
          }
  
          this.teachersCount = res.data.total_number_of_teachers || 0;
          this.studentsCount = res.data.total_number_of_student || 0;
          this.parents = res.data.total_number_of_parent || 0;
          this.total_attendance = this.role == 'admin' 
          ? res.data.todays_attendance || 0 
          : res.data.students_are_attending_today || 0;
          this.event_list = res.data.event_list || [];
  
          // Format dates in event list
          this.event_list.forEach((element: any) => {
            element.starting_date = this.data.formatDate(element.starting_date);
            element.ending_date = this.data.formatDate(element.ending_date);
          });
  
        } else {
          // Handle non-successful response code
          this.resetDataState();
          this.showErrorMessage('Failed to load dashboard data.');
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
        console.error('Error fetching dashboard data:', error);
  
        // Reset data state in case of error
        this.resetDataState();
  
        // Provide user feedback
        if (error.status === 0) {
          this.showErrorMessage('No internet connection. Please check your network and try again.');
        } else {
          this.showErrorMessage('An error occurred while loading the dashboard. Please try again later.');
        }
      }
    });
  }
  
   resetDataState() {
    this.teachersCount = 0;
    this.studentsCount = 0;
    this.parents = 0;
    this.total_attendance = 0;
    this.event_list = [];
    this.progress = "";
  }
  private showErrorMessage(message: string) {
    this.toastService.presentErrorToast("Server error: Please try again later");
  }
  selectedDate(newValue: any) {
    this.dateRange = newValue;
    // console.log(this.dateRange);
  }
  filter_by_date(){
    const formData = new FormData();
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    formData.append('startDate', this.dateRange?.startDate ? this.formatDate(this.dateRange.startDate) : this.formatDate(defaultStartDate));
    formData.append('endDate', this.dateRange?.endDate ? this.formatDate(this.dateRange.endDate) : this.formatDate(defaultEndDate));
    
    this.list(formData);
  }
  formatDate(date: Date | any): any | null {
    return this.datePipe.transform(date, 'MMMM dd, yyyy');
  }
  async unpaid_invoice(){
    const modal = await this.modalController.create({
      component: UnpaidInvoiceListPage,
      cssClass: '',
      componentProps: {
        title: "Top 10 Unpaid Invoice List",
        data:this.dashboardData?.top_ten_unpaid_invoices
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }

  createBarChart() {
    // console.log(this.dashboardData?.invoice_chart_date?.date);
    // console.log(this.dashboardData?.invoice_chart_amount?.amount);
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dashboardData?.invoice_chart_date?.date,
        datasets: [
          {
            label: 'Amount',
            data: this.dashboardData?.invoice_chart_amount?.amount,
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',  // Color for the first bar
              'rgba(255, 99, 132, 0.6)',  // Color for the second bar
              'rgba(54, 162, 235, 0.6)',  // Color for the third bar
              'rgba(255, 206, 86, 0.6)',  // Color for the fourth bar
              'rgba(153, 102, 255, 0.6)', // Color for the fifth bar
              'rgba(255, 159, 64, 0.6)',  // Color for the sixth bar
              'rgba(201, 203, 207, 0.6)', // Color for the seventh bar
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          },
        },
      },
    });
  }
  async chartView(){
    const modal = await this.modalController.create({
      component: InvoiceChartPage,
      cssClass: '',
      componentProps: {
        title: "Invoice Chart",
        amount: this.dashboardData?.invoice_chart_amount?.amount,
        dates:this.dashboardData?.invoice_chart_date?.date,
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ionViewDidEnter();
    });
    return await modal.present();
  }
}
