import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StripePaymentPage } from '../stripe-payment/stripe-payment.page';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.page.html',
  styleUrls: ['./online-payment.page.scss'],
})
export class OnlinePaymentPage implements OnInit {

  heading_title: string = '';
  invoiceId: any;
  selectedPayment: string = '';
  invoice_title: string = '';
  total_amount: any;
  invoiceData: any;
  invoice_amount:any;
  selectedOption: string = '';
  partialAmount: number  = 0;
  isAmountExceeded: boolean = false;
  constructor(private toastService:ToastService,private router: Router,private fetch: SchoolDataService,private navParams: NavParams, private modalController: ModalController) {
  }

  ngOnInit() {
    this.heading_title = this.navParams?.get('title');
    this.invoiceData = this.navParams?.get("dataPay");
    console.log(this.invoiceData);
    this.invoiceId = this.invoiceData?.invoice_id;
    this.invoice_title = this.invoiceData?.invoice_title;
    this.invoice_amount =  this.invoiceData?.invoice_amount;
    this.selectOption('full');
  }
  selectOption(option: string) {
    this.selectedOption = option;
  }
  selectPayment(method: string) {
    this.selectedPayment = method;
    if(this.selectedOption == 'partial'){
      if(this.isAmountExceeded == false && this.partialAmount > 0){
        this.openStripe(this.invoiceId, this.partialAmount);
      }
    }else{
      this.openStripe(this.invoiceId, this.invoiceData?.remaining_amount);
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async openStripe(invoiceId: any = "", amount: any = "") {
    const modal = await this.modalController.create({
      component: StripePaymentPage,
      cssClass: '',
      componentProps: {
        title: "Stripe",
        invoiceId: invoiceId,
        amount: amount,
        student_name: this.invoiceData.student_name
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.closeModal();
      this.ngOnInit();

    });

    return await modal.present();
  }

  validateAmount(event: any) {
    const inputAmount = parseFloat(event.target.value);

    // Check if the input amount exceeds the remaining amount
    if (inputAmount > this.invoiceData?.remaining_amount) {
      this.isAmountExceeded = true;
    } else {
      this.isAmountExceeded = false;
    }
  }

}
