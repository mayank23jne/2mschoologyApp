import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  currentURI:any;
  constructor(public router:Router,private navCtrl: NavController) { }

  ngOnInit() {
    this.currentURI = this.router.url;
  }

  back(){
    this.navCtrl.back();
  }

}
