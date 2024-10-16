import { Injectable } from '@angular/core';
import { SchoolDataService } from './school-data.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  paymentData: any;
  stripeData: any;
  payData: any;
  subscriptionStatus: any;
  subscriptionStatusData:any;
  constructor(private fetch: SchoolDataService) {}

  getAdminPaymentCreds(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch.getAdminPaymentDetail().subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.payData = res?.data;
            resolve(this.payData);
          } else {
            resolve(false);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }
  getStatusSubscriptionData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch.getSubscriptionStatus().subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.subscriptionStatusData = res;
            resolve(this.subscriptionStatusData);
          } else {
            resolve(false);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }
  getSubscriptionStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch.getSubscriptionStatus().subscribe({
        next: (res: any) => {
          if (res.code == 200) {
            this.subscriptionStatus = res?.plan_status;
            resolve(this.subscriptionStatus);
          } else {
            resolve(false);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }
}
