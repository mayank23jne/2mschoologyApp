import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { NavController, Platform } from '@ionic/angular';
import { SchoolDataService } from '../services/school-data.service';
import { EventService } from '../services/event.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private navCtrl: NavController,event : EventService,private fetch: SchoolDataService,private http: HttpClient, private router: Router, private platform: Platform) {
   
   }
  authState = new BehaviorSubject(false);
  isLoggedIn(): boolean {
    // Replace this with real authentication check
    return !!localStorage.getItem('userToken');
  }

  ifLoggedIn() {
    var response = localStorage.getItem("userToken");
    if (response) {
      this.authState.next(true);
    }else{
      this.authState.next(false);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  login(token: string): void {
    localStorage.setItem('userToken', token);
  }

  logout() {
    localStorage.clear();
    this.authState.next(false);
    this.navCtrl.navigateRoot('/login');
  }
}
