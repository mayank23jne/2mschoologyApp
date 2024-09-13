import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  role:any;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.role$.subscribe((role: any) => {
      this.role = role;
    });
  }

}
