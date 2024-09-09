import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { App } from '@capacitor/app';
import { ToastService } from 'src/app/core/services/toast.service';
import { EventService } from 'src/app/core/services/event.service';
import { AuthService } from 'src/app/core/guards/auth.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  formData: any = {};
  loginPasswordIcon: string = 'eye-off';
  loginPasswordType: string = 'password';

  constructor(private data: DataService,private loader: LoaderService,private event : EventService,private authservice:AuthService,private fetch: SchoolDataService,private toastService:ToastService,private alertController: AlertController,private platform:Platform,private fb: FormBuilder,public router:Router,private menu: MenuController,private navCtrl: NavController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  loginPassword() {
    this.loginPasswordType = this.loginPasswordType === 'text' ? 'password' : 'text';
    this.loginPasswordIcon = this.loginPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ionViewDidEnter(){
    this.form.markAsUntouched();
    this.menu.enable(false, 'start');
  }
  ionViewWillEnter(){
    this.authservice.authState.subscribe(state => {
      if (state) {
        this.menu.enable(true);
        this.router.navigateByUrl('/tabs/tab1');
      }
    });
  }
  handleBackButton() {
    const currentUrl = this.router.url;
    if (currentUrl === '/login') {
      this.showExitConfirmationAlert();
    }else{
      this.navCtrl.back();
    } 
  }
   login(){
      this.form.markAllAsTouched();
      let formData = {'email':this.form?.get('email')?.value,'password':this.form?.get('password')?.value};
      this.loader.present();
      this.fetch.login(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.loader.dismiss(); 
          if (res) {
            if (res.code === 200) {
              this.toastService.presentToast("Login Successfully");
              this.form.patchValue({ email: '', password: '' });
              this.form.markAsUntouched();
              
              if (['teacher', 'student', 'parent','admin','superadmin'].includes(res.data.role)) {
                if(res.data){
                  
                localStorage.setItem("loginUserData", JSON.stringify(res.data));
                console.log(res.data.token);
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userId", res.data.user_id);
                this.data.setRole(res.data.role);
                localStorage.setItem("role", res.data.role);
                this.authservice.login(res.data.token);
                }
                this.event.publish('user:refresh', {});
                this.menu.enable(true, 'start');
                window.location.href = '/tabs/tab1'; 
               //this.router.navigateByUrl('/tabs/tab1'); 
              } else {
                this.toastService.presentErrorToast("Invalid role: Access denied");
              }
            } else {
              // Handle cases where the response is not successful
              this.toastService.presentErrorToast("Invalid login: Incorrect credentials");
            }
          } else {
            // Handle cases where the response is null or undefined
            this.toastService.presentErrorToast("Unexpected error: No response from server");
          }
        },
        error: (error) => {
          this.loader.dismiss(); // Ensure loader is dismissed on error
          if (error.message === 'Network Error' || error.status === 0) {
            this.toastService.presentErrorToast("No internet connection or server unreachable");
          } else if (error.status >= 400 && error.status < 500) {
            // Handle client-side or authentication errors
            this.toastService.presentErrorToast("Invalid login: " + (error.error?.message || 'Check your credentials'));
          } else if (error.status >= 500) {
            // Handle server-side errors
            this.toastService.presentErrorToast("Server error: Please try again later");
          } else {
            // Handle any other unexpected errors
            this.toastService.presentErrorToast("An unexpected error occurred: " + error.message);
          }
        }
      });
  }
  async showExitConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });
  
    await alert.present();
  }
  
}
