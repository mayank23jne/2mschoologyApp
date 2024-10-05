import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-invoice-chart',
  templateUrl: './invoice-chart.page.html',
  styleUrls: ['./invoice-chart.page.scss'],
})
export class InvoiceChartPage implements OnInit {

  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;

  barChart: any;
  amount:any;
  dates:any;

  constructor(private datePipe: DatePipe,private popoverController: PopoverController,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.amount = this.navParams.get('amount');
    this.dates = this.navParams.get('dates');
  }

  ngAfterViewInit() {
    this.loader.present();
    setTimeout(() => {
      this.createBarChart();
      this.loader.dismiss();
    }, 5000);
  }

  closeModal() {
    this.modalController.dismiss();
  }
 
  createBarChart() {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');

    const barChart = new Chart(ctx, {
      type: 'bar', // The type of chart
      data: {
        labels:  this.dates,
        datasets: [{
          label: 'Amount',
          data: this.amount,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',  
            'rgba(255, 99, 132, 0.6)',  
            'rgba(54, 162, 235, 0.6)',  
            'rgba(255, 206, 86, 0.6)',  
            'rgba(153, 102, 255, 0.6)', 
            'rgba(255, 159, 64, 0.6)',  
            'rgba(201, 203, 207, 0.6)', 
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
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Important for full-screen
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }
  
}
