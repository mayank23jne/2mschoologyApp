import { Component } from '@angular/core';
import { AuthService } from './core/guards/auth.service';
import { EventService } from './core/services/event.service';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { SchoolDataService } from './core/services/school-data.service';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@capacitor/network';
import { ToastService } from './core/services/toast.service';
import { App } from '@capacitor/app';

interface AppPage {
  title: string;
  url: string;
  icon: string;
  children?: AppPage[];  // Added optional children property
}

interface AppPageWithChildren extends AppPage {
  children?: AppPage[];
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_data: any;
  selectedIndex: any = -1;
  selectedSubPage: string | null = null;
  appPages: AppPage[] = [];
  constructor(private alertController: AlertController,private toastService:ToastService,private platform: Platform, private router: Router, private fetch: SchoolDataService, private menu: MenuController, private authservice: AuthService, private event: EventService) {
    this.initializeNetworkListener();
    this.initializeApp();
    this.event.publish('user:refresh', {});
  }
  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.setStatusBar();
      }
      this.checkNetworkStatus();
    });
    let log = this.authservice.ifLoggedIn();
    this.user_data = localStorage.getItem('loginUserData');
    if (this.user_data) {
      this.sidebar();
      this.user_data = JSON.parse(this.user_data);
    } else {
      this.user_data = "";
    }
   

    this.event.subscribe('user:refresh', (data: any) => {

    this.user_data = localStorage.getItem('loginUserData');
      if (this.user_data) {
        this.sidebar();
        this.user_data = JSON.parse(this.user_data);
        this.menu.enable(true, 'start');
      } else {
        this.user_data = "";
      }
     
    });
  }
  async checkNetworkStatus() {
    const status = await Network.getStatus();
    console.log('Network status:', status);
    if (!status.connected) {
      //this.presentAlert();
      this.toastService.presentErrorToast("No internet connection. Features may not be available.");
    }
  }
  initializeNetworkListener() {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if (!status.connected) {
        //this.presentAlert();
        this.toastService.presentErrorToast("No internet connection. Features may not be available.");
      }
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert !',
      message: 'No internet connection. Features may not be available.',
      buttons: [
        {
          text: 'Action',
          handler: () => {
            console.log('Action button clicked');
            App.exitApp();
          }
        }
      ],
    });
  
    await alert.present();
  }
  async setStatusBar() {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#727cf5' });
  }
  transformDataWithCategories(data: any): AppPageWithChildren[] {
    const transformed: AppPageWithChildren[] = [];

    for (const category in data) {
      const parentCategory: AppPageWithChildren = {
        title: category.charAt(0).toUpperCase() + category.slice(1),
        url: `/${category}`,
        icon: data[category].icon_app,
        children: []
      };

      data[category].menus.forEach((item: any) => {
        parentCategory.children!.push({
          title: item.displayed_name,
          url: `/${item.route_name}`,
          icon: item.icon
        });
      });

      transformed.push(parentCategory);
    }

    return transformed;
  }
  toggleAccordion(index: number) {
    if (this.appPages[index].children) {
      this.selectedIndex = (this.selectedIndex === index) ? -1 : index;
    } else {
      if (!this.appPages[index].hasOwnProperty('children')) {
        this.menu.close();
      }
      this.router.navigate([this.appPages[index].url]);
    }
  }
  navigateTo(url: string) {
    this.menu.close();
    if (url == '/homework') {
      this.router.navigateByUrl('/tabs/tab2');
      this.selectedSubPage = '/tabs/tab2';
    }
    else {
      this.router.navigateByUrl(url);
    }
  }
  isSelected(url: string): boolean {
    return this.router.url === url;
  }
  isSelectedHome(url: string) {
    return this.router.url === url;
  }
  toggleSubPages(index: number) {
    if (this.selectedIndex == index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
  }
  logout() {
    this.authservice.logout();
  }
  sidebar() {
    this.fetch.getMenu().subscribe({
      next: (res: any) => {
        if (res) {
          this.appPages = res.data;
          this.appPages = this.transformDataWithCategories(res.data);
        }
        else {
          this.appPages = [];
        }
      },
      error: (error: any) => {

      }
    });
  }
  dashboard() {
    this.selectedIndex = -1;
    this.router.navigate(['/tabs/tab1']);
  }
  gotoPage(p:any){
    if(p.url == '/Generate Invoice'){
      this.router.navigate(['/generateinvoice']);
      this.menu.close();
    }
    }
}
