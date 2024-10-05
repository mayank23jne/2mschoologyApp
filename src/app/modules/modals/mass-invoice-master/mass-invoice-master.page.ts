import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-mass-invoice-master',
  templateUrl: './mass-invoice-master.page.html',
  styleUrls: ['./mass-invoice-master.page.scss'],
})
export class MassInvoiceMasterPage implements OnInit {

  massInvoiceForm!:FormGroup;
  selectedClass:any;
  module_name:any;
  heading_title:any;
  sections:any;
  studentsList:any;
  classes:any;
  sections_list:any;
  showDuration: boolean = false;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.massInvoiceForm = this.fb.group({
      class_id: ['', Validators.required],
      section_id: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      invoice_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      paid_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['', Validators.required]
    });

    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res) {
          this.classes = res.classes;
          this.sections_list = res.section;
        }
      },
      error: (error: any) => {

      }
    });

  }
  onClassChange() {
    this.selectedClass = this.massInvoiceForm.get('class_id')?.value;
    this.sections = this.sections_list.filter((item: { class_id: string; }) => item.class_id === this.selectedClass);
    this.massInvoiceForm.patchValue({
      section_id: this.sections[0].id,
    });
    const formData = new FormData();
    formData.append('class_id', this.selectedClass);
    
  }
  closeModal() {
    this.modalController.dismiss();
  }
  submit(){
    console.log(this.massInvoiceForm.value);
    let formData = this.massInvoiceForm.value;
    this.fetch.massInvoice(formData).subscribe({
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
      this.massInvoiceForm.get('duration')?.setValue('');
    }
  }

}
