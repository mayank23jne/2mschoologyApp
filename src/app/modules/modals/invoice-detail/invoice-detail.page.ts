import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { InvoicePrintPage } from '../invoice-print/invoice-print.page';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {
  heading_title:any;
  detail:any;
  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private data: DataService,private router: Router,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.detail = this.navParams.get('invoiceData');
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async printPreview(id:any){
    const invoiceModal = await this.modalController.create({
      component: InvoicePrintPage,
      cssClass: '',
      componentProps: {
        title: "Print Invoice",
        invoice_id: id,
      }
    });
    invoiceModal.onDidDismiss().then((dataReturned) => {

    });
    return await invoiceModal.present();
  }

}
