import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { StudentExcelPage } from '../modals/student-excel/student-excel.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.page.html',
  styleUrls: ['./admission.page.scss'],
})
export class AdmissionPage implements OnInit {

  studentForm!: FormGroup;
  parent_list:any;
  formData: any;
  class_id:any;
  section_id:any;
  // Mock parent data for dropdown
  
  constructor(private modalController: ModalController,private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder) {}
 
  ngOnInit(): void {
   this.studentForm = this.fb.group({
      class_id: ['', Validators.required],
      section_id: ['', Validators.required],
      students: this.fb.array([this.createStudentGroup()])
    });
    this.formData = new FormData();
    this.formData.append('user_type', "parent");
    this.adminParentList( this.formData);
  }

  onFilterChange(event: { class: string, section: string, student_id: any }) {
    this.formData = new FormData();
    this.studentForm.patchValue({
       class_id: event.class,
       section_id: event.section
      });
  }
  adminParentList(data:any){
    this.fetch.viewUserMaster(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
          this.parent_list = res.data;
        }
        else{
          this.parent_list = "";
        }
      },
      error: (error:any) => {
        
      }
    });
  }
  // Create a form group for a student
  createStudentGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['Male', Validators.required],
      parent_id: ['', Validators.required]
    });
  }

  // Get students as form array
  get students(): FormArray {
    return this.studentForm.get('students') as FormArray;
  }

  // Add a new student row
  addStudent() {
    this.students.push(this.createStudentGroup());
  }

  // Remove a student row
  removeStudent(index: number) {
    this.students.removeAt(index);
  }

  // Submit the form
  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.loader.present();
      this.fetch.bulkStudentAdmission(this.studentForm.value).subscribe({
        next:(res:any) => {
        if(res.code == 200){
          this.loader.dismiss();
          this.toastService.presentToast(res.response);
          }
          else{
            
          }
          this.loader.dismiss();
        },
        error: (error:any) => {
          this.loader.dismiss();
        }
      });
    } else {
      this.toastService.presentErrorToast("Form is invalid")
    }
  }
  async openAddModal() {
    const modal = await this.modalController.create({
      component: StudentExcelPage,
      cssClass: '',
      componentProps: {
        title: "Add Student excel",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
     
    });
    return await modal.present();
  }
}
