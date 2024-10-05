import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-joint-invoice-master',
  templateUrl: './joint-invoice-master.page.html',
  styleUrls: ['./joint-invoice-master.page.scss'],
})
export class JointInvoiceMasterPage implements OnInit {

  jointInvoiceForm!:FormGroup;
  selectedClass:any;
  module_name:any;
  heading_title:any;
  sections:any;
  parentList:any;
  studentsList:any[] = []; 
  classes:any;
  sections_list:any;
  showDuration: boolean = false;
  filteredStudentsList: any[] = []; 
  selectedStudentIds:any;
constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

ngOnInit() {
   
    this.heading_title = this.navParams.get('title');

    this.jointInvoiceForm = this.fb.group({
      class_id: ['', Validators.required],
      parent_id: ['', Validators.required],
      student_id: [[], Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      invoice_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      paid_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
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
  onParentChange(event: any) {
    const selectedParentId = event?.detail?.value;
    const formData = new FormData();
    formData.append('parent_id', selectedParentId);
    this.fetch.getStudentsByParent(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.studentsList = res.data;
         
          const defaultSelectedStudents = this.studentsList.map(student => student.id);
          this.jointInvoiceForm.get('student_id')?.setValue(defaultSelectedStudents);
        
        }
      },
      error: (error: any) => {

      }
    });
    
  }
  onClassChange() {
    this.selectedClass = this.jointInvoiceForm.get('class_id')?.value;
   
    const formData = new FormData();
    formData.append('class_id', this.selectedClass);
    this.fetch.getParentByClass(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.parentList = res.data;
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
    this.selectedStudentIds = this.jointInvoiceForm.get('student_id')?.value;
    let selectedStudentIds = this.selectedStudentIds.join(',')
    this.jointInvoiceForm.patchValue({
      student_id:selectedStudentIds
    })
    console.log(this.jointInvoiceForm.value);
    let formData = this.jointInvoiceForm.value;

    this.fetch.studentJointInvoice(formData).subscribe({
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
    if (!this.showDuration) {
      this.jointInvoiceForm.get('duration')?.setValue('');
    }
  }
  
}
