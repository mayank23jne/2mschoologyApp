import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PaymentReportInfoPage } from '../modals/payment-report-info/payment-report-info.page';
import { DataService } from 'src/app/core/services/data.service';
import { InvoiceMasterPage } from '../modals/invoice-master/invoice-master.page';
import { JointInvoiceMasterPage } from '../modals/joint-invoice-master/joint-invoice-master.page';
import { MassInvoiceMasterPage } from '../modals/mass-invoice-master/mass-invoice-master.page';
import { JointMassInvoiceMasterPage } from '../modals/joint-mass-invoice-master/joint-mass-invoice-master.page';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

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
  role:any;

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
  exportType:any;

  constructor(private platform: Platform,private router: Router,private data: DataService,private datePipe: DatePipe,private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService,  private modalController: ModalController) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });

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
    this.filter('list');
  }
  ionViewDidEnter() {
    this.list();
  }
  list() {
   this.loader.present();
    this.fetch.studentFeeManagerData().subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        this.isloading = false;
        if (res.code == 200) {
         
          this.studentData = res.data;
        }
        else {
          this.studentData = [];
        }
        
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


  filter(type:any){
    const formData = new FormData();
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    formData.append('selectedClass',this.selectedClass);
    formData.append('selectedStatus',this.selectedStatus);
    formData.append('selectedParent',this.selectedParent);
    formData.append('startDate', this.dateRange?.startDate ? this.formatDate(this.dateRange.startDate) : this.formatDate(defaultStartDate));
    formData.append('endDate', this.dateRange?.endDate ? this.formatDate(this.dateRange.endDate) : this.formatDate(defaultEndDate));
    if(type == 'export'){
      this.export(formData);
    }else{
      this.feeManagerlist(formData);
    }
  }
  
  export(formData:any){
    formData.append('type',this.exportType);
    this.fetch.exportRport(formData).subscribe({
      next:(res:any) => {
      if(res){
            if(this.exportType == 'csv'){
              this.downloadCSV(res);
            }else{
              this.downloadPdf(res);
            }
        }
      },
      error: (error:any) => {
       
      }
    });
  }
  formatDate(date: Date | any): any | null {
    return this.datePipe.transform(date, 'MMMM dd, yyyy');
  }
  feeManagerlist(formData:any){
    this.fetch.adminStudentFeeManager(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        
        this.reportData = res.data;
          
        }
        else{
          this.reportData = [];
        }
       
      },
      error: (error:any) => {
        
      }
    });
  }
  adminParentList(data:any){
   
    this.fetch.viewUserMaster(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
       
          this.parentData = res.data;
        }
        else{
          this.parentData = "";
        }
       
      },
      error: (error:any) => {
      
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
        const formData = new FormData();
        formData.append('student_ids', ids);
        this.fetch.deleteAllStudentFeeManager(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.selectedInvoiceIds.clear(); 
              this.selectAllChecked = false; 
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

  async downloadCSV(data: any) {
    console.log(data);
    const csvRows = data; 
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const base64Data = await this.convertBlobToBase64(blob);
    
    let fileName = `Report_${new Date().toISOString().slice(0, 10)}.csv`;  // e.g., "Report_2023-10-01.csv"
    
    await this.saveCsvToDevice(base64Data, fileName);
  }


  async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async saveCsvToDevice(base64Data: string, fileName: string) {
    await this.platform.ready();
    
    const fileData = base64Data.split(',')[1]; 

    Filesystem.writeFile({
      path: fileName,
      data: fileData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8, 
      recursive: true
    }).then(() => {
      this.toastService.presentToast("File saved successfully");
    }).catch((error) => {
      this.toastService.presentErrorToast("Error in saving");
    });
  }
  async downloadPdf(blob: any) {
    let fileName = `Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    await this.savePDFToDevice(blob, fileName);
  }
  async savePDFToDevice(fileData: any, fileName: string) {
    await this.platform.ready();
    
    Filesystem.writeFile({
      path: fileName,
      data: fileData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8, 
      recursive: true
    }).then(() => {
      this.toastService.presentToast("File saved successfully");
    }).catch((error) => {
      this.toastService.presentErrorToast("Error in saving");
    });
  }
}
