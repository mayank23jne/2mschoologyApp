import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SchoolDataService } from './school-data.service';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private teacherData: any;
  
  private stripePromise: Promise<Stripe | null>;
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || '');
  role$ = this.roleSubject.asObservable();
  
  constructor(private alertController: AlertController,private datePipe: DatePipe,private fetch: SchoolDataService,) {
    this.stripePromise = loadStripe('pk_test_51HMKNhKWFHVxBazQvcSopBzg3fLOE7Or7KFN95kbfvYDMU63ujYKyqIcE2oCSlKtz164F77xkzvjaFLUvQhhEnt50013y0n5cR');
  }

  setTeachersData(data: any) {
    this.teacherData = data;
  }
  getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
  async handlePayment(clientSecret: string) {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe.js has not loaded');
    }
    return stripe.confirmCardPayment(clientSecret);
  }

  getTeachersData() {
    return this.teacherData;
  }
  setRole(role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }
  getRole() {
    return this.roleSubject.value;
  }
  formatDate(input: any): string | null {
  
  const date = new Date(input);

  if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
  }

  const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const parts = formattedDate.split(' ');
  const day = parts[1].replace(',', '');
  const month = parts[2].replace('.', '');
  const year = parts[3];
  const weekday = parts[0].replace(',', '');

  return `${weekday}, ${day}-${month}-${year}`;
  }
  convertDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('-').map(Number);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[month - 1];
    return `${day} ${monthName} ${year}`;
  }
  dbformatDate(dateString: string): string {
    let date = new Date(dateString);
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
  formatYmd(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are you sure to delete this !!!",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              resolve(false); 
            }
          },
          {
            text: "Yes",
            handler: () => {
              resolve(true); 
            }
          }
        ]
      });
  
      await alert.present();
    });
  }
  confirmCardPayment(clientSecret: string, cardElement: any) {
    return this.getStripe().then(stripe => {
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      return stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
    });
  }

}
