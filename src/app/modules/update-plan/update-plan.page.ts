import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PlanPaymentsPage } from '../modals/plan-payments/plan-payments.page';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.page.html',
  styleUrls: ['./update-plan.page.scss'],
})
export class UpdatePlanPage implements OnInit {

  billingCycle: string = 'monthly';  // default to 'monthly'
  monthlyList:any;
  yearlyList:any;
  userSubscriptionStatus:any;
  subscription_status:any = 'Inactive';
  planData:any;
  constructor(private payService: PaymentServiceService,private modalController: ModalController,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService) { }

  ngOnInit() {
    
    this.loadSubscriptionDetails();
    this.list(); 
  }

  async loadSubscriptionDetails() {
    try {
      this.userSubscriptionStatus  = await this.payService.getStatusSubscriptionData();
      if (this.userSubscriptionStatus) {
        this.loader.dismiss();
        this.subscription_status =  this.userSubscriptionStatus?.plan_status;
        this.planData =  this.userSubscriptionStatus?.data;
        console.log(this.subscription_status);
      } else {
       
        this.list();
        this.loader.dismiss();
        this.subscription_status = 'Inactive';
      }
    } catch (error) {
      this.loader.dismiss();
      console.log('Error retrieving payment data:', error);
    }
  }

  toggleBillingCycle() {
    console.log('Billing cycle changed to:', this.billingCycle);
  }
  list(){
    this.loader.present();
    this.fetch.updatePlan().subscribe({
      next:(res:any) => {
        this.loader.dismiss();
        if(res.code == 200){
        this.monthlyList = res.data.Monthly;
        this.yearlyList = res.data.Yearly;
       
        }
        else{
          this.loader.dismiss();
        }
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  async update(item:any){
    console.log(item);
    const paymnetModal = await this.modalController.create({
      component: PlanPaymentsPage,
      cssClass: '',
      componentProps: {
        title: "Make Payment",
        plan_data: item
      }
    });
    paymnetModal.onDidDismiss().then((dataReturned) => { });

    return await paymnetModal.present();
  }

}
