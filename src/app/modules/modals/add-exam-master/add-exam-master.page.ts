import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-exam-master',
  templateUrl: './add-exam-master.page.html',
  styleUrls: ['./add-exam-master.page.scss'],
})
export class AddExamMasterPage implements OnInit {

  heading_title:String = "";

  examForm!: FormGroup;
  gradeForm!: FormGroup;
  promotionForm!: FormGroup;

  examData:any;
  examID:any;
  gradeData:any;
  gradeID:any;
  promotionData:any;
  promotionID:any;

  editExamData:any;
  editExamID:any;
  editgradeData:any;
  editgradeID:any;
  editPromotionData:any;
  editPromotionID:any;

  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');

    this.editExamData = this.navParams.get('editClassData');
    this.editExamID = this.editExamData.id;
    
    this.initializeForms();
  }
  private initializeForms() {
    this.examForm = this.fb.group({
      exam_name: [this.editExamData?.exam_name || '', Validators.required],
      starting_date: [this.editExamData?.starting_date || '', Validators.required],
      ending_date: [this.editExamData?.ending_date || '', Validators.required],
    });

    // this.promotionForm = this.fb.group({
    //   class_room_name: [this.editpromotionData?.class_room_name || '', Validators.required],
    // });

}

closeModal() {
  this.modalController.dismiss();
}

submit_exam(){
      this.examForm.markAllAsTouched();
      const formData = new FormData();
      formData.append('exam_name', this.examForm.get('exam_name')?.value);
      formData.append('starting_date', this.examForm.get('starting_date')?.value);
      formData.append('ending_date', this.examForm.get('ending_date')?.value);
      this.loader.present();
      this.fetch.addExam(formData).subscribe({
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
submit_grade(){
  this.gradeForm.markAllAsTouched();
  const formData = new FormData();
  formData.append('class_name', this.gradeForm.get('class_name')?.value);
  this.loader.present();
  this.fetch.addGrade(formData).subscribe({
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
submit_promotion(){
    this.promotionForm.markAllAsTouched();
    const formData = new FormData();
    formData.append('class_room_name', this.promotionForm.get('class_room_name')?.value);
    this.loader.present();
    this.fetch.addPromotion(formData).subscribe({
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

