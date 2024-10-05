import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-settings',
  templateUrl: './website-settings.page.html',
  styleUrls: ['./website-settings.page.scss'],
})
export class WebsiteSettingsPage implements OnInit {

  websiteMenus:any = {
    // "noticeboard":"Noticeboard",
    // "events":"Events",
    // "teachers":"Teachers",
    // "gallery":"Gallery",
    "about_us":"About us",
    "terms":"Terms and conditions",
    "privacy_policy":"Privacy policy",
    // "homepage_setting":"Homepage Slider",
    "general_settings":"General setting",
    "others":"Others"
  };

  
  menuEntries = Object.entries(this.websiteMenus);

  constructor(public router:Router) {
   
  }
  ngOnInit() {
  }
  openSetting(page:any){
    this.router.navigate([`${page}`]);
  }
}
