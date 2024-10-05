import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { InvoiceInfoPage } from '../invoice-info/invoice-info.page';
import { PaymentReportInfoPage } from '../modals/payment-report-info/payment-report-info.page';
import { DataService } from 'src/app/core/services/data.service';
import { InvoiceMasterPage } from '../modals/invoice-master/invoice-master.page';
import { JointInvoiceMasterPage } from '../modals/joint-invoice-master/joint-invoice-master.page';
import { MassInvoiceMasterPage } from '../modals/mass-invoice-master/mass-invoice-master.page';
import { JointMassInvoiceMasterPage } from '../modals/joint-mass-invoice-master/joint-mass-invoice-master.page';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.page.html',
  styleUrls: ['./payment-report.page.scss'],
})
export class PaymentReportPage implements OnInit {
  formData: any;
  search: any;
  dateRange:any;
  selectedClass:any  = "all";
  selectedParent:any = "all";
  selectedStatus:any = "all";
  classes:any;
  parentData:any;
  reportData:any;
  selectedInvoiceIds: Set<number> = new Set(); 
  ShowDelete:any = false;
  selectAllChecked = false;
  constructor(private data: DataService,private datePipe: DatePipe,private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService,  private modalController: ModalController) { }

  ngOnInit() {

    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res) {
          this.classes = res.classes;
        }
      },
      error: (error: any) => {

      }
    });
    this.formData = new FormData();
    this.formData.append('user_type', "parent");
    this.adminParentList( this.formData);
    this.filter();
  }
  filter(){
    const formData = new FormData();
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    formData.append('selectedClass',this.selectedClass);
    formData.append('selectedStatus',this.selectedStatus);
    formData.append('selectedParent',this.selectedParent);
    formData.append('startDate', this.dateRange?.startDate ? this.formatDate(this.dateRange.startDate) : this.formatDate(defaultStartDate));
    formData.append('endDate', this.dateRange?.endDate ? this.formatDate(this.dateRange.endDate) : this.formatDate(defaultEndDate));
    
    this.list(formData);
  }
  formatDate(date: Date | any): any | null {
    return this.datePipe.transform(date, 'MMMM dd, yyyy');
  }
  list(formData:any){
    this.fetch.adminStudentFeeManager(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.reportData = res.data;
          console.log(this.reportData);
        }
        else{
          this.reportData = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  adminParentList(data:any){
    this.loader.present();
    this.fetch.viewUserMaster(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.parentData = res.data;
        }
        else{
          this.parentData = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  selectedDate(newValue: any) {
    this.dateRange = newValue;
    console.log(this.dateRange);
  }
  async viewDetail(item:any) {
    const modal = await this.modalController.create({
      component: PaymentReportInfoPage,
      cssClass: '',
      componentProps: {
        title: "Invoice info",
        paymentReportData:item
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
  async invoiceAdd(condition:any) {
    
    const component = condition === 'single_invoice' ? InvoiceMasterPage : JointInvoiceMasterPage;
                      
    const modal = await this.modalController.create({
      component: component,  
      cssClass: '',
      componentProps: {
        title: condition === 'single_invoice' ? "Single invoice" :"Joint Invoice",  
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
  async massInvoiceAdd(condition:any) {
    const component = condition === 'mass_invoice' ? MassInvoiceMasterPage : JointMassInvoiceMasterPage;                
    const modal = await this.modalController.create({
      component: component,  
      cssClass: '',
      componentProps: {
        title: condition === 'mass_invoice' ? "Mass invoice" :"Joint mass invoice",  
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }

  isSelected(id: number): boolean {
    return this.selectedInvoiceIds?.has(id);
  }
  // Handle individual student selection
  onInvoiceCheckChange(invoice_id: number, event: any) {
    if (event.detail.checked) {
      this.selectedInvoiceIds.add(invoice_id);
    } else {
      this.selectedInvoiceIds.delete(invoice_id);
    }
    this.updateSelectAllState();
    if(this.selectedInvoiceIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }
  updateSelectAllState() {
    this.selectAllChecked = this.reportData.length === this.selectedInvoiceIds.size;
  }
  toggleSelectAll() {
    if (this.selectAllChecked) {
      this.reportData.forEach((item: { id: number; }) => this.selectedInvoiceIds.add(item.id));
    } else {
      this.selectedInvoiceIds.clear();
    }
    if(this.selectedInvoiceIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }
  deleteSelected() {
    
    const selectedIdsArray = Array.from(this.selectedInvoiceIds);
    const selectedIdsString = `{${selectedIdsArray.join(',')}}`;
    console.log('Selected Student IDs:', selectedIdsString);
    this.delete(selectedIdsString);
     
  }
  
  delete(ids: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        console.log(ids);
        // const formData = new FormData();
        // formData.append('student_ids', ids);
        // this.fetch.deleteDepartment(formData).subscribe({
        //   next: (res: any) => {
        //     if (res.code == 200) {
        //       this.toastService.presentToast(res.response);
        //       this.studentData = this.studentData.filter((item: { student_id: number; }) => !this.selectedStudentIds.has(item.student_id));
        //       this.selectedStudentIds.clear(); 
        //       this.selectAllChecked = false; 
        //     } else {
        //       this.toastService.presentErrorToast(res.response);
        //     }
        //   },
        //   error: (error: any) => {
        //   }
        // });
      }
    });
  }

}
  


