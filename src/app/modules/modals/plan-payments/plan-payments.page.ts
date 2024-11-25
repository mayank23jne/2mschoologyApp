import { Component, OnInit } from '@angular/core';
import { PlanStripePaymentPage } from '../plan-stripe-payment/plan-stripe-payment.page';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ModalController, NavParams } from '@ionic/angular';
import { isSubscription } from 'rxjs/internal/Subscription';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';

@Component({
  selector: 'app-plan-payments',
  templateUrl: './plan-payments.page.html',
  styleUrls: ['./plan-payments.page.scss'],
})
export class PlanPaymentsPage implements OnInit {

  heading_title: string = '';
  planId: any;
  selectedPayment: string = '';
  plan_name: string = '';
  total_amount: any;
  planData: any;
  isSubscribed:boolean = false;
  stripePlanId:any;
  paypalPlanId:any;
  PaypalPaymentDetail:any = [];
  paypalPlanDataResponse:any;
  constructor(private payservice:PaymentServiceService,private toastService:ToastService,private router: Router,private fetch: SchoolDataService,private navParams: NavParams, private modalController: ModalController) {
  }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.planData = this.navParams.get("plan_data");
    this.paypalPlanDataResponse =  JSON.parse(this.planData?.paypal_plan_details);
    this.paypalPlanId =  this.paypalPlanDataResponse?.id;
    this.stripePlanId =  this.planData?.id;
    this.plan_name = this.planData.plan_name;
    this.total_amount = this.planData.amount;
    console.log(this.total_amount);
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
      if(this.paypalPlanId){
      this.subscribeToPlan(this.paypalPlanId);
      }else{
        this.toastService.presentErrorToast('Not getting paypal plan id');
      }
    } else {
      if(this.stripePlanId){
      this.openStripe(this.stripePlanId, this.total_amount);
      }else{
        this.toastService.presentErrorToast('Not getting stripe plan id');
      }
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
  loadPayPalScript(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${options['client-id']}&currency=${options.currency}&vault=true`;
      script.onload = () => resolve((window as any).paypal);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  async openStripe(planId: any = "", amount: any = "") {
    const modal = await this.modalController.create({
      component: PlanStripePaymentPage,
      cssClass: '',
      componentProps: {
        title: "Stripe",
        planId: this.stripePlanId,
        amount: amount,
        plan_name: this.plan_name
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.closeModal();
      this.ngOnInit();

    });

    return await modal.present();
  }

  
  createSubscription(planId: string, currency: string): Promise<any> {
    const options = {
     'client-id': this.PaypalPaymentDetail?.paypal_mode == 'sandbox' ? this.PaypalPaymentDetail?.paypal_client_id_sandbox : this.PaypalPaymentDetail?.paypal_client_id_production, 
      currency: currency
    };
  
    return this.loadPayPalScript(options).then((paypal: any) => {
      return new Promise((resolve, reject) => {
        paypal.Buttons({
          createSubscription: (data:any, actions:any) => {
            return actions.subscription.create({
              plan_id: planId 
            });
          },
          onApprove: (data:any, actions:any) => {
            resolve(data);  
          },
          onError: (err:any) => {
            reject(err);   
          }
        }).render('#paypal-button-container');  
      });
    });
  }

  async subscribeToPlan(plan_id:any) {
    try {
      const subscriptionData = await this.createSubscription(plan_id, 'USD');
      
      if (subscriptionData) {
        console.log('Subscription Approved: ', subscriptionData);
        
        const paymentDetails = {
          subscription_id: subscriptionData.subscriptionID,
          plan_id: this.planId
        };
        await this.storePaymentDetails(paymentDetails);
        console.log('Payment details saved to backend.');
      }
    } catch (error) {
      console.error('Error during subscription: ', error);
    }
  }

  storePaymentDetails(paymentDetails:any){
    console.log(paymentDetails);
    let data_args = {'subscription_id':paymentDetails?.subscription_id,'plan_type':this.planData?.plan_type,"payment_plan_id" : this.planData?.id};
    this.fetch.paypal_payment_success(data_args).subscribe({
      next: async (res: any) => {
        
        this.toastService.presentToast('Payment Succeeded');
        this.closeModal();
        this.router.navigate(['tabs/tab1']);
      },
      error: (error: any) => {
        console.error('Error', error);
      }
    });
  }


}
