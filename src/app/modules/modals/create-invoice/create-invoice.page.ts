import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CreateClientPage } from '../create-client/create-client.page';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.page.html',
  styleUrls: ['./create-invoice.page.scss'],
})
export class CreateInvoicePage implements OnInit {

  invoiceForm!: FormGroup;
  heading_title:any;
  editData:any;
  defaultDate:any;
  setDefaultDate:any;
  client_from_list:any;
  client_to_list:any;
  editID:any;


  constructor(private popoverController: PopoverController,private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {

    this.heading_title = this.navParams.get('title');
    this.editID = this.navParams.get('editId');
  
    if(this.editID){
    let formData = {"id":this.editID};
    this.fetch.getGenerateInvoice(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          if (res.data) {
            this.populateForm(res.data);
          } 
         
        } else {
         
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  this.initializeForm();
    
  }

  populateForm(data: any) {
   
    this.invoiceForm.patchValue({
      from_client_id: data.invoice.from_client_id,
      to_client_id: data.invoice.to_client_id,
      note: data.invoice.note,
      invoice_date: data.invoice.invoice_date,
      status: data.invoice.status
    });

    const invoiceArray = this.invoiceForm.get('invoices') as FormArray;
    console.log();
    data.invoice_detail.forEach((invoice: any) => {
      invoiceArray.push(this.fb.group({
        title: [invoice.title],
        invoice_amount: [invoice.invoice_amount],
        quantity: [invoice.quantity],
        paid_amount: [invoice.paid_amount],
        due_amount: [invoice.due_amount]
      }));
    });
  }
  private initializeForm() {
    const today = new Date();
    const defaultYear = today.getFullYear();
    const defaultMonth = today.getMonth() + 1;
    const defaultDay = today.getDate() + 1;
    this.defaultDate = new Date(defaultYear, defaultMonth - 1, defaultDay).toISOString().split('T')[0];
    this.setDefaultDate = new Date().toISOString();
    
    this.invoiceForm = this.fb.group({
      invoice_date:  [this.defaultDate, Validators.required],
      status: ['unpaid', Validators.required],
      from_client_id: ['', [Validators.required, Validators.maxLength(50)]],
      to_client_id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      note: [''],
      invoices: this.editID ? this.fb.array([]) : this.fb.array([this.createInvoice()])
    });

     this.get_client_from_list();
  }

  get invoices() {
    return this.invoiceForm?.get('invoices') as FormArray;
  }

  createInvoice(): FormGroup {
   
    return this.fb.group({
      title: ['', Validators.required],
      invoice_amount: ['', Validators.required],
      quantity: ['', Validators.required],
      paid_amount: ['', Validators.required],
      due_amount: [{ value: '' }] 
    });
  
  }

  addInvoice() {
    this.invoices.push(this.createInvoice());
  }

  removeInvoice(index: number) {
    this.invoices.removeAt(index);
  }

  updateDueAmount(invoice: AbstractControl) {
    const invoiceGroup = invoice as FormGroup;
    
    const invoiceAmount = invoiceGroup?.get('invoice_amount')?.value || "";
    const quantity = invoiceGroup?.get('quantity')?.value || "";
    const paidAmount = invoiceGroup?.get('paid_amount')?.value || "";
    const dueAmount = (invoiceAmount * quantity) - paidAmount;
    invoiceGroup.get('due_amount')?.setValue(dueAmount);

  }

  closeModal() {
    this.modalController.dismiss();
  }

  submit(){
    this.invoiceForm.markAllAsTouched();
    let formData = this.invoiceForm.value;
    this.fetch.createInvoice(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
          this.modalController.dismiss();
          this.loader.dismiss();
        } else {
          this.toastService.presentErrorToast(res.response);
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  async resetStartDate() {
    this.invoiceForm?.get('invoice_date')?.reset(""); // Reset to current date
    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
  }

  async savedate() {
    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
  }

  setStartDate() {
    console.log(this.invoiceForm?.value.invoice_date);
  }

  get_client_from_list(){
    this.fetch.dropdownclientData().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
       
          this.client_from_list = res.data.client_from;
          this.client_to_list = res.data.client_to;
        }
        else{
          this.client_from_list = [];
          this.client_to_list = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }

  async createFromInvoice(){
    const modal = await this.modalController.create({
      component: CreateClientPage,
      cssClass: '',
      componentProps: {
        title: "Add From Client",
        type:"from"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      
    });
    return await modal.present();
  }
  async createToInvoice(){
    const modal = await this.modalController.create({
      component: CreateClientPage,
      cssClass: '',
      componentProps: {
        title: "Add To Client",
        type:"to"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      
    });
    return await modal.present();
  }
}
