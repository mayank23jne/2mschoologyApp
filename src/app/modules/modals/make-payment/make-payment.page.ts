import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { loadScript } from "@paypal/paypal-js";
import { StripePaymentPage } from '../stripe-payment/stripe-payment.page';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
  heading_title: string = '';
  invoiceId: any;
  selectedPayment: string = '';
  invoice_title: string = '';
  total_amount: any;
  invoiceData: any;
  PaypalPaymentDetail:any;

  constructor(private payservice:PaymentServiceService,private toastService:ToastService,private router: Router,private fetch: SchoolDataService,private navParams: NavParams, private modalController: ModalController) {
  }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.invoiceData = this.navParams.get("invoiceData");
    this.invoiceId = this.invoiceData.id;
    this.invoice_title = this.invoiceData.title;
    this.total_amount = this.invoiceData.total_amount;
    this.loadPaypalPaymentDetails();
  }

  async loadPaypalPaymentDetails() {
    try {
      this.PaypalPaymentDetail = await this.payservice.getAdminPaymentCreds();
      if (this.PaypalPaymentDetail) {
        console.log('Payment data:', this.PaypalPaymentDetail);
      } else {
        console.log('Failed to retrieve payment data');
      }
    } catch (error) {
      console.log('Error retrieving payment data:', error);
    }
  }
  selectPayment(method: string) {
    this.selectedPayment = method;
    if (this.selectedPayment == 'paypal') {
      this.loadPayPal(this.total_amount);
    } else {
      this.openStripe(this.invoiceId, this.total_amount);
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }


  loadPayPalScript(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${options['client-id']}&currency=${options.currency}`;
      script.onload = () => resolve((window as any).paypal);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  async openStripe(invoiceId: any = "", amount: any = "") {
    const modal = await this.modalController.create({
      component: StripePaymentPage,
      cssClass: '',
      componentProps: {
        title: "Stripe",
        invoiceId: invoiceId,
        amount: amount,
        student_name: this.invoiceData.student
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.closeModal();
      this.ngOnInit();

    });

    return await modal.present();
  }

  loadPayPal(amount: any) {
   
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error('Invalid amount provided');
      return;
    }
  
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }
   
    const scriptOptions = {
     'client-id': this.PaypalPaymentDetail?.paypal_mode == 'sandbox' ? this.PaypalPaymentDetail?.paypal_client_id_sandbox : this.PaypalPaymentDetail?.paypal_client_id_production, 
      currency: 'USD',
    };
  
    this.loadPayPalScript(scriptOptions)
      .then((paypal: any) => {
        
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.total_amount  
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {

              let data_args = {'payment_method': 'paypal','amount_to_pay': this.total_amount, 'invoice_id': this.invoiceId,'response':JSON.stringify(data)};
              this.fetch.payment_success(data_args).subscribe({
                next: async (res: any) => {
                  
                  this.toastService.presentToast('Payment Succeeded');
                  this.closeModal();
                  this.router.navigate(['invoice']);
                },
                error: (error: any) => {
                  console.error('Error', error);
                }
              });
              
              console.log('Transaction data:', data);
            });
          },
          onError: (err: any) => {
            console.error('Error during the transaction', err);
          }
        }).render('#paypal-button-container');
      })
      .catch((err: any) => {
        console.error('Failed to load PayPal SDK', err);
      });
  }
}
