import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ClassRoutineInfoPage } from '../modals/class-routine-info/class-routine-info.page';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  user_id: any;
  classList: any;
  isloading: boolean = true;
  studentData: any = [];
  constructor(private fetch: SchoolDataService, private loader: LoaderService, private router: Router) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.list();
  }
  list() {
    this.loader.present();

    this.fetch.studentFeeManagerData().subscribe({
      next: (res: any) => {
        this.isloading = false;
        if (res.code == 200) {
          this.loader.dismiss();
          this.studentData = res.data;

        }
        else {
          this.studentData = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
        this.isloading = false;
      }
    });
  }
  getInvoiceInfo(id: any) {
    this.router.navigate(['invoice-info', id]);
  }
  passInvoiceInfo(id: any) {
    this.router.navigate(['invoice-info', id]);
  }

}
