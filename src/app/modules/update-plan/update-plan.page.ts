import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PlanPaymentsPage } from '../modals/plan-payments/plan-payments.page';
import { PaymentServiceService } from 'src/app/core/services/payment-service.service';
import { DataService } from 'src/app/core/services/data.service';
import { Capacitor } from '@capacitor/core';

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
  role:any;
  show:boolean = true;
  backButtonSubscription: any;
  constructor(private platform: Platform,private data: DataService,private payService: PaymentServiceService,private modalController: ModalController,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    console.log(this.role);
    this.loadSubscriptionDetails();
    if(this.role == 'admin'){
      this.list(); 
    }

    if (Capacitor.isNativePlatform()) {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        if (this.subscription_status != 'Active') {
          // Disable the back button if the plan is inactive
          console.log('Back button disabled because the plan is inactive.');
          // You can also show a toast or alert to the user here if needed
        } else {
          // If the plan is active, allow normal back button functionality
          console.log('Plan is active. Proceed with the back button.');
          processNextHandler();
        }
      });
    }
  }

  async loadSubscriptionDetails() {
    try {
      this.userSubscriptionStatus  = await this.payService.getStatusSubscriptionData();
      if (this.userSubscriptionStatus) {
        this.loader.dismiss();
        this.subscription_status =  this.userSubscriptionStatus?.plan_status;
        this.planData =  this.userSubscriptionStatus?.data;
        this.show = false;
        console.log(this.subscription_status);
      } else {
       
        this.list();
        this.loader.dismiss();
        this.subscription_status = 'Inactive';
        this.show = false;
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
