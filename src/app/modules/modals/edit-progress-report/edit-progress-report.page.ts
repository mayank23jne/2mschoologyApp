import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-edit-progress-report',
  templateUrl: './edit-progress-report.page.html',
  styleUrls: ['./edit-progress-report.page.scss'],
})
export class EditProgressReportPage implements OnInit {

  heading_title:any;
  form!: FormGroup;
  progress_report_id:any;
  progress_report_data:any;

  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.progress_report_id = this.navParams.get('id');
    this.form = this.fb.group({
      name: ["", Validators.required],
      note: ["", Validators.required],
      performance: ["", Validators.required],
    });
    const formData = new FormData();
    formData.append('progress_id', this.progress_report_id);
    this.fetch.getProgressReportById(formData).subscribe({
      next:(res:any) => {
      this.progress_report_data = res.data;
      
      if(this.progress_report_data){
        this.form.patchValue({
          name: this.progress_report_data.student_name,
          note: this.progress_report_data.progress_data.note,
          performance: this.progress_report_data.progress_data.performance,
        });
        this.loader.dismiss();
      }

      },
      error: (error:any) => {
        this.loader.dismiss();
      }
      
    });

    
  }
  closeModal() {
    this.modalController.dismiss();
  }
  update(){
    this.form.markAllAsTouched();
    const formData = new FormData();
    formData.append('note', this.form.get('note')?.value);
    formData.append('performance', this.form.get('performance')?.value);
    formData.append('progress_id', this.progress_report_id);
   
    this.loader.present();
    this.fetch.updateProgressReport(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
      this.modalController.dismiss();
      this.toastService.presentToast(res.response);
      this.loader.dismiss();
      }else{
        this.loader.dismiss();
        this.toastService.presentErrorToast(res.response);
      }
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
      
    });

  }
}
