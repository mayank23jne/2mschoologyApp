import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CreateInvoicePage } from '../modals/create-invoice/create-invoice.page';
import { InvoiceDetailPage } from '../modals/invoice-detail/invoice-detail.page';


@Component({
  selector: 'app-generateinvoice',
  templateUrl: './generateinvoice.page.html',
  styleUrls: ['./generateinvoice.page.scss'],
})
export class GenerateinvoicePage implements OnInit {

  invoiceList:any;
  search:any;
  ShowDelete:any = false;
  selectedIds: Set<number> = new Set(); // Holds the IDs of selected students
  selectAllChecked = false;
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}

  ngOnInit() {
    this.list();
  }

  list(){
    this.loader.present();
    this.fetch.generateInvoiceList().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.invoiceList = res.data;
        }
        else{
          this.invoiceList = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  
  searchRes() {
    this.invoiceList = this.invoiceList.filter((item: { invoice_id: string }) => item.invoice_id.toLowerCase().includes(this.search.toLowerCase()));
  }
  
  searchCancel(){
    this.search = "";
    this.list();
  }
  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }
  deleteSelected() {
    // Convert the Set to an array and then to a JSON string
    const selectedIdsArray = Array.from(this.selectedIds);

    const selectedIdsString = `{${selectedIdsArray.join(',')}}`;
 
    console.log('Selected IDs:', selectedIdsString);

    this.deleteAll(selectedIdsString);
     
  }
  toggleSelectAll() {
    if (this.selectAllChecked) {
      this.invoiceList.forEach((item: { invoice_id: number; }) => this.selectedIds.add(item.invoice_id));
    } else {
      this.selectedIds.clear();
    }
    if(this.selectedIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('invoice_id', id);
        this.fetch.deleteSingleGenerateInvoice(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ngOnInit();
            } else {
              this.toastService.presentErrorToast(res.response);
            }
          },
          error: (error: any) => {
          }
        });
      }
    });
  }
  deleteAll(ids: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = new FormData();
        formData.append('invoice_id', ids);
        this.fetch.deleteAllGenerateInvoice(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ngOnInit();
            } else {
              this.toastService.presentErrorToast(res.response);
            }
          },
          error: (error: any) => {
          }
        });
      }
    });
  }
  async openDetailModal(item:any) {
    const modal = await this.modalController.create({
      component: InvoiceDetailPage,
      cssClass: '',
      componentProps: {
        title: "Invoice info",
        invoiceData: item,
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
  async openEditModal(item:any) {
    const modal = await this.modalController.create({
      component: CreateInvoicePage,
      cssClass: '',
      componentProps: {
        title: "Edit invoice",
        editId:item.invoice_id
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: CreateInvoicePage,
      cssClass: '',
      componentProps: {
        title: "Create invoice",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ngOnInit();
    });
    return await modal.present();
  }
  onCheckChange(student_id: number, event: any) {
    if (event.detail.checked) {
      this.selectedIds.add(student_id);
    } else {
      this.selectedIds.delete(student_id);
    }
    this.updateSelectAllState();
    if(this.selectedIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }
  updateSelectAllState() {
    this.selectAllChecked = this.invoiceList.length === this.invoiceList.size;
  }
}
