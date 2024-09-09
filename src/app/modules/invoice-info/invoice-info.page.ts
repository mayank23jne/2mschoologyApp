import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ModalController } from '@ionic/angular';
import { PrintInvoicePage } from '../modals/print-invoice/print-invoice.page';
import { MakePaymentPage } from '../modals/make-payment/make-payment.page';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.page.html',
  styleUrls: ['./invoice-info.page.scss'],
})
export class InvoiceInfoPage implements OnInit {
  invoice_id: any;
  invoiceData: any = [];
  formData: any;
  apiIsLoaded: boolean = false;
  constructor(private route: ActivatedRoute, private modalController: ModalController, private fetch: SchoolDataService, private loader: LoaderService) { }

  ngOnInit() {
    this.invoice_id = this.route.snapshot.paramMap.get('id');
    this.formData = new FormData();
    this.formData.append('invoice_id', this.invoice_id);
    this.list();
  }
  async makePaymentModal(data: any) {

    const paymnetModal = await this.modalController.create({
      component: MakePaymentPage,
      cssClass: '',
      componentProps: {
        title: "Make Payment",
        invoiceData: data
      }
    });
    paymnetModal.onDidDismiss().then((dataReturned) => { });

    return await paymnetModal.present();
  }

  async invoiceModal(invoice_id: any) {
    const invoiceModal = await this.modalController.create({
      component: PrintInvoicePage,
      cssClass: '',
      componentProps: {
        title: "Print Invoice",
        invoice_id: invoice_id,
      }
    });
    invoiceModal.onDidDismiss().then((dataReturned) => {

    });

    return await invoiceModal.present();
  }
  list() {
    this.loader.present();
    this.fetch.studentFeeManagerData(this.formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.invoiceData = res.data;
        }
        else {
          this.invoiceData = [];
        }
        this.loader.dismiss();
        this.apiIsLoaded = true;
      },
      error: (error: any) => {
        this.loader.dismiss();
        this.apiIsLoaded = true;
      }
    });
  }

}
