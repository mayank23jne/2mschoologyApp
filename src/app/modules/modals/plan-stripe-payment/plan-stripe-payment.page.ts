import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stripe } from '@capacitor-community/stripe';
import { ModalController, NavParams } from '@ionic/angular';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';

@Component({
  selector: 'app-plan-stripe-payment',
  templateUrl: './plan-stripe-payment.page.html',
  styleUrls: ['./plan-stripe-payment.page.scss'],
})
export class PlanStripePaymentPage implements OnInit {

  data:any = {};
  amount:any;
  plan_id:any;
  clientSecret:any;
  cardElement:any;
  isProcessing: boolean = false; 
  plan_name:any;
  PaymentDetail:any;
  
  constructor(private payservice:PaymentServiceService,private router: Router,private loader: LoaderService,private toastService:ToastService,private dataService:DataService,private fetch: SchoolDataService,private navParams: NavParams,private http:HttpClient,private modalController : ModalController) {
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
   ngOnInit() {
    this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
    }, 3000);
    this.amount = this.navParams?.get('amount');
    this.plan_id = this.navParams?.get('planId'); 
    this.plan_name = this.navParams?.get('plan_name'); 
      
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

  async pay(pi:any,subscription:any) {
   
    if (this.isProcessing) {
      return; 
    }
    
    try {
      
      const stripe = await this.dataService.getStripe();
      if (!stripe) {
        console.error('Stripe failed to load');
        return;
      }
      const { error, paymentIntent } = await this.dataService.confirmCardPayment(pi, this.cardElement);

      if (error) {
        this.toastService.presentErrorToast("Payment error");
        console.error('Payment failed:', error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        
      let data = {'subscription':subscription,'payment_plan_id':this.plan_id};
      console.log(data);
      this.fetch.plan_payment_success(data).subscribe({
        next: async (res: any) => {
          console.log(res);
          this.isProcessing = false;
          this.toastService.presentToast('Payment Succeeded');
          this.closeModal();
          this.router.navigate(['tabs/tab1']);
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
      this.isProcessing = true;
    try {
      // Prepare data to send to backend
      let data = {'payment_method': 'Stripe','amount_to_pay': this.amount, 'plan_id': this.plan_id };
      this.fetch.plan_payment_stripe(data).subscribe({
        next: async (res: any) => {
          console.log(res);
          if (res && res.data) {
            this.clientSecret = res.data.paymentIntent;
            
            this.pay(this.clientSecret,res.data?.subscription);
            // const ephemeralKey = res.data.paymentIntent;
            //const customer = res.data.customer;
            console.log(res.data);
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
