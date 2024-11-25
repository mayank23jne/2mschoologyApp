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
import { EventService } from 'src/app/core/services/event.service';

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
  
  constructor(private event: EventService,private payservice:PaymentServiceService,private router: Router,private loader: LoaderService,private toastService:ToastService,private dataService:DataService,private fetch: SchoolDataService,private navParams: NavParams,private http:HttpClient,private modalController : ModalController) {
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
    this.cardElement.mount('#element-card');
    console.log(this.cardElement);
  }
  async pay(pi: any, subscription: any) {
    var self = this;
    
    try {
      const stripe = await this.dataService.getStripe();
      if (!stripe) {
        console.error('Stripe failed to load');
        return;
      }
      console.log(self.cardElement);
      const { error, paymentIntent } = await this.dataService.confirmCardPayment(pi, self.cardElement);
      console.log(paymentIntent);
      if (error) {
        this.toastService.presentErrorToast("Payment error");
        console.error('Payment failed:', error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const data = { subscription, payment_plan_id: this.plan_id };
        console.log('Payment Success Data:', data);
  
        this.fetch.plan_payment_success(data).subscribe({
          next: async (res: any) => {
            console.log('Payment Success Response:', res);
            this.toastService.presentToast('Payment Succeeded');
            this.isProcessing = false;
            this.closeModal();
            this.event.publish('user:refresh', {});
            window.location.href = '/tabs/tab1'; 
          },
          error: (error: any) => {
            this.isProcessing = false;
            console.error('Error in plan_payment_success:', error);
            this.toastService.presentErrorToast('Error processing payment. Please contact support.');
          },
          complete: () => {
            
          }
        });
      }
    } catch (error) {
      console.error('Error in pay method:', error);
      this.toastService.presentErrorToast('An unexpected error occurred.');
    } finally {
       this.isProcessing = false;
    }
  }
  
  getPaymentIntent() {
    this.isProcessing = true;
    try {
      const data = {
        payment_method: 'Stripe',
        amount_to_pay: this.amount,
        plan_id: this.plan_id,
      };
  
      this.fetch.plan_payment_stripe(data).subscribe({
        next: async (res: any) => {
          if (!res?.data?.paymentIntent || !res.data.subscription) {
            console.error('Invalid payment response:', res);
            this.toastService.presentErrorToast('Failed to initialize payment.');
            
            return;
          }
  
          this.clientSecret = res.data.paymentIntent;
          console.log('Payment Intent:', this.clientSecret);
  
          this.pay(this.clientSecret, res.data.subscription);
        },
        error: (error: any) => {
          console.error('Error fetching payment intent:', error);
          this.toastService.presentErrorToast('Failed to start payment process.');
        },
        complete: () => {
          
        }
      });
    } catch (error) {
      console.error('Error in getPaymentIntent:', error);
      this.toastService.presentErrorToast('Unexpected error occurred during payment initialization.');
      
    }
  }
 

  closeModal() {
    this.modalController.dismiss();
  }


}
