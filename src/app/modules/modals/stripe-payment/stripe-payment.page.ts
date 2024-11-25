import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe ,PaymentSheetResultInterface} from '@capacitor-community/stripe';
import { ModalController, NavParams } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.page.html',
  styleUrls: ['./stripe-payment.page.scss'],
})
export class StripePaymentPage implements OnInit {

  data:any = {};
  amount:any;
  invoice_id:any;
  clientSecret:any;
  cardElement:any;
  isProcessing: boolean = false; // Track payment processing state
  student_name:any;
  PaymentDetail:any;
  
  constructor(private payservice:PaymentServiceService,private router: Router,private loader: LoaderService,private toastService:ToastService,private dataService:DataService,private fetch: SchoolDataService,private navParams: NavParams,private http:HttpClient,private modalController : ModalController) {
    this.loadStripePaymentDetails();
   }
 
   ngOnInit() {
    this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
    }, 3000);
    this.amount = this.navParams?.get('amount');
    this.invoice_id = this.navParams?.get('invoiceId'); 
    this.student_name = this.navParams?.get('student_name'); 
    this.loadStripePaymentDetails();
      
   }
   async loadStripePaymentDetails() {
    try {
      this.PaymentDetail = await this.payservice.getAdminPaymentCreds();
      if (this.PaymentDetail) {
        Stripe.initialize({
            publishableKey: this.PaymentDetail?.stripe_test_public_key,
        });
        console.log('Payment data:', this.PaymentDetail);
      } else {
        console.log('Failed to retrieve payment data');
      }
    } catch (error) {
      console.log('Error retrieving payment data:', error);
    }
  }
   async ngAfterViewInit() {
    const stripe = await this.dataService.getStripe();
    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }
    const elements = stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async pay(pi:any) {
    if (this.isProcessing) {
      return; 
    }

    this.isProcessing = true; 
    try {
      
      const stripe = await this.dataService.getStripe();
      if (!stripe) {
        console.error('Stripe failed to load');
        return;
      }
      console.log(this.cardElement);
      const { error, paymentIntent } = await this.dataService.confirmCardPayment(pi, this.cardElement);
      console.log(paymentIntent);
      if (error) {
        this.toastService.presentErrorToast("Payment error");
        console.error('Payment failed:', error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        
      let data = {'payment_method': 'stripe','amount_to_pay': this.amount, 'invoice_id': this.invoice_id,'response':paymentIntent};
      this.fetch.payment_success(data).subscribe({
        next: async (res: any) => {
          console.log(res);
          this.isProcessing = false;
          this.toastService.presentToast('Payment Succeeded');
          this.closeModal();
          this.router.navigate(['invoice']);
        },
        error: (error: any) => {
          this.isProcessing = false;
          console.error('Error', error);
        }
      });
      }
    } catch (error) {
      this.toastService.presentErrorToast("Payment error");
    } finally {
      this.isProcessing = false; // Reset processing state
    }
  }
    getPaymentIntent() {
    try {
      // Prepare data to send to backend
      let data = { 'amount_to_pay': this.amount, 'invoice_id': this.invoice_id };
      this.fetch.payment_stripe(data).subscribe({
        next: async (res: any) => {
          console.log(res);
          if (res && res.data) {
            this.pay(res.data?.paymentIntent);
            // const ephemeralKey = res.data.paymentIntent;
            // const customer = res.data.customer;
          } else {
            console.error('Invalid response from payment_stripe:', res);
          }
        },
        error: (error: any) => {
          console.error('Error fetching payment data', error);
        }
      });
  
    } catch (error) {
      console.error('Error in presentPaymentSheet', error);
    }
  }
 

  closeModal() {
    this.modalController.dismiss();
  }

}
