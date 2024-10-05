import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-unpaid-invoice-list',
  templateUrl: './unpaid-invoice-list.page.html',
  styleUrls: ['./unpaid-invoice-list.page.scss'],
})
export class UnpaidInvoiceListPage implements OnInit {

  unpaidInvoiceData:any;
  heading_title!: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private loader: LoaderService,
  ) { }

  ngOnInit() {

    this.heading_title = this.navParams.get('title');
    this.unpaidInvoiceData = this.navParams.get('data');
    console.log(this.unpaidInvoiceData);
  }
  closeModal(){
    this.modalController.dismiss();
  }

}
