import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }
  
  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
    message: infoMessage,
    duration: 2000,
    position: 'top',
    cssClass: 'success-toast-background'
    });
    toast.present();
  }
  async presentEmailToast(infoMessage: string) {
    const toast = await this.toastController.create({
    message: infoMessage,
    duration: 5000,
    position: 'top',
    cssClass: 'success-toast-background'
    });
    toast.present();
  }

  async presentErrorToast(infoMessage: string) 
  {
    const toast = await this.toastController.create({
    message: infoMessage,
    duration: 2000,
    position: 'top',
    cssClass: 'error-toast-background'
    });
    toast.present();
  }
}
