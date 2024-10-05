import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sub-invoices',
  templateUrl: './sub-invoices.page.html',
  styleUrls: ['./sub-invoices.page.scss'],
})
export class SubInvoicesPage implements OnInit {

  heading_title:any;
  invoice_id:any;
  invoiceList:any;
  search:any;

  constructor(private data: DataService,private popoverController: PopoverController, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private router: Router, private navParams: NavParams, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {

    this.heading_title = this.navParams.get('title');
    this.list()
  }

  searchRes() {

    this.invoiceList = this.invoiceList.filter((item: { invoice_id: string }) => item.invoice_id.toLowerCase().includes(this.search.toLowerCase()));
  }
  
  searchCancel(){
    this.search = "";
    this.list();
  }
  list(){
    this.loader.present();
    this.invoice_id = this.navParams.get("id");
    let formdata = {'invoice_id':this.invoice_id }
    this.fetch.subInvoiceData(formdata).subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if(res) {
          this.invoiceList = res.data;
          console.log(this.invoiceList);
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
      
    });
  }

  toggleAccordion(index: number) {
    this.invoiceList[index].isOpen = !this.invoiceList[index].isOpen;
  }
  closeModal() {
    this.modalController.dismiss();
  }

}
