import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ManualPaymentPage } from '../manual-payment/manual-payment.page';
import { SubInvoicesPage } from '../sub-invoices/sub-invoices.page';
import { PrintReportPage } from '../print-report/print-report.page';
import { OnlinePaymentPage } from '../online-payment/online-payment.page';

@Component({
  selector: 'app-payment-report-info',
  templateUrl: './payment-report-info.page.html',
  styleUrls: ['./payment-report-info.page.scss'],
})
export class PaymentReportInfoPage implements OnInit {

  heading_title:any;
  paymentReportData:any;

  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private data: DataService,private router: Router,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.paymentReportData = this.navParams.get('paymentReportData');
    console.log(this.paymentReportData);

  }
  delete(id:any) {
    this.data.presentAlertConfirm().then((res: any) => {
      if(res == true){
        const formData = new FormData();
        formData.append('invoice_id', id);
        this.fetch.deleteSingleStudentFeeManager(formData).subscribe({
          next:(res:any) => {
            if(res.code == 200){
              this.toastService.presentToast(res.response);
              this.loader.dismiss();
              this.modalController.dismiss();

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
  
  async online_payment(){
    const modal = await this.modalController.create({
      component: OnlinePaymentPage,
      cssClass: '',
      componentProps: {
        title: "Online Payment",
        dataPay:this.paymentReportData
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }

  async manual_payment(){
    const modal = await this.modalController.create({
      component: ManualPaymentPage,
      cssClass: '',
      componentProps: {
        title: "Manual Payment",
        data:this.paymentReportData
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
  async print_invoice(){
    const modal = await this.modalController.create({
      component: PrintReportPage,
      cssClass: '',
      componentProps: {
        title: "Print Invoice",
        id:this.paymentReportData?.id,
        student_name:this.paymentReportData?.student_name
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
  async sub_invoice(){
    const modal = await this.modalController.create({
      component: SubInvoicesPage,
      cssClass: '',
      componentProps: {
        title: "Sub Invoices",
        id:this.paymentReportData?.id
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
}
