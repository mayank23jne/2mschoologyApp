import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.page.html',
  styleUrls: ['./update-plan.page.scss'],
})
export class UpdatePlanPage implements OnInit {

  billingCycle: string = 'monthly';  // default to 'monthly'
  monthlyList:any;
  yearlyList:any;
  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService) { }

  ngOnInit() {
    const formData = new FormData();
    this.list();
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
        // console.log(this.monthlyList);
        // console.log(this.yearlyList);
        }
        else{
          
        }
      },
      error: (error:any) => {
        
      }
    });
  }
  

}
