import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-joint-mass-invoice-master',
  templateUrl: './joint-mass-invoice-master.page.html',
  styleUrls: ['./joint-mass-invoice-master.page.scss'],
})
export class JointMassInvoiceMasterPage implements OnInit {

  jointMassInvoiceForm!:FormGroup;
  selectedClass:any;
  module_name:any;
  heading_title:any;
  sections:any;
  parentList:any[] = []; 
  studentsList:any[] = []; 
  classes:any;
  showDuration: boolean = false;

constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

ngOnInit() 
{
  
  this.heading_title = this.navParams.get('title');

  this.jointMassInvoiceForm = this.fb.group({
    class_id: ['', Validators.required],
    parent_id: [[], Validators.required],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    invoice_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
    paid_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
    recurring :[false],
    duration :[''],
    status: ['', Validators.required]
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
}

onClassChange() {
  this.selectedClass = this.jointMassInvoiceForm.get('class_id')?.value;
 
  const formData = new FormData();
  formData.append('class_id', this.selectedClass);
  this.fetch.getParentByClass(formData).subscribe({
    next: (res: any) => {
      if (res) {
        this.parentList = res.data;
        // const defaultSelecteds = this.parentList.map(parent => parent.parent_id);
        // this.jointMassInvoiceForm.get('parent_id')?.setValue(defaultSelecteds);
      }
    },
    error: (error: any) => {

    }
  });
  
}
closeModal() {
  this.modalController.dismiss();
}
submit(){
  console.log(this.jointMassInvoiceForm.value);
  let formData = this.jointMassInvoiceForm.value;
  this.fetch.jointMassInvoice(formData).subscribe({
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

toggleRecurring(event: any) {
  this.showDuration = event.detail.checked;
  
  // Optionally, you can clear or set the duration value based on the checkbox state
  if (!this.showDuration) {
    this.jointMassInvoiceForm.get('duration')?.setValue('');
  }
}

}
