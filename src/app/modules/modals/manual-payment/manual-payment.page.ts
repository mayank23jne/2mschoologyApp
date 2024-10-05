import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.page.html',
  styleUrls: ['./manual-payment.page.scss'],
})
export class ManualPaymentPage implements OnInit {

  manualPaymentForm!:FormGroup;
  selectedClass:any;
  module_name:any;
  heading_title:any;
  sections:any;
  studentsList:any;
  classes:any;
  sections_list:any;
  showDuration: boolean = false;
  reportData:any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.loader.present();
    this.heading_title = this.navParams.get('title');
    this.reportData = this.navParams.get('data');
    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res) {
          this.classes = res.classes;

        }
      },
      error: (error: any) => {

      }
    });
    console.log(this.reportData);
    this.manualPaymentForm = this.fb.group({
      id: this.reportData?.id,
      class_id: [this.reportData?.class_id ? this.reportData?.class_id :'', Validators.required],
      student_id: [this.reportData?.student_id ? this.reportData?.student_id :'', Validators.required],
      title: [this.reportData?.invoice_title ? this.reportData?.invoice_title :'', [Validators.required, Validators.maxLength(50)]],
      invoice_amount: [this.reportData?.invoice_amount ? this.reportData?.invoice_amount :'', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      total_amount:[this.reportData?.remaining_amount ? this.reportData?.remaining_amount :''],
      paid_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['', Validators.required],
      
    });
    this.onClassChange();
    this.loader.dismiss();
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onClassChange() {
    if(this.reportData?.class_id){
      this.selectedClass = this.reportData?.class_id
    }else{
      this.selectedClass = this.manualPaymentForm?.get('class_id')?.value;
    }
   
    const formData = new FormData();
    formData.append('class_id', this.selectedClass);
    this.fetch.studentData(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.studentsList = res.data;
        }
      },
      error: (error: any) => {

      }
    });
  }
  toggleRecurring(event: any) {
    this.showDuration = event.detail.checked;
    
    // Optionally, you can clear or set the duration value based on the checkbox state
    if (!this.showDuration) {
      this.manualPaymentForm.get('duration')?.setValue('');
    }
  }
  submit(){
    console.log(this.manualPaymentForm.value);
    let formData = this.manualPaymentForm.value;
    this.fetch.manualPayment(formData).subscribe({
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
}
