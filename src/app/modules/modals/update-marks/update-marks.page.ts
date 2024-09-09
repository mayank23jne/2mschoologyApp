import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-update-marks',
  templateUrl: './update-marks.page.html',
  styleUrls: ['./update-marks.page.scss'],
})
export class UpdateMarksPage implements OnInit {

  heading_title:any;
  mark_data:any;
  form!: FormGroup;
  student_id:any;
  student_name:any;
  grade:any;
  mark_id:any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.form = this.fb.group({
      comment: [""],
      mark_obtained: [""],
      grade:[""],
    });

    this.heading_title = this.navParams.get('title');
    this.mark_data = this.navParams.get('mark_data');

    this.form.patchValue({
      comment: this.mark_data.comment,
      mark_obtained:this.mark_data.mark_obtained,
    });

    this.mark_id = this.mark_data.id;
    this.student_id = this.mark_data.student_id;
    this.student_name = this.mark_data.student_name;
    this.form.patchValue({
      grade:this.getGrade()
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
  getGrade(){
    let marks = JSON.parse(this.form.get('mark_obtained')?.value);
    let data = {'mark_obtained':marks};
    
    this.fetch.getGradePoint(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.form.patchValue({
          grade:res.data
        });
          return res.data;
        }
        else{
          return false;
        }
      },
      error: (error:any) => {
        return false;
      }
    });
  }
  update(){
    this.loader.present();
    let data = {
      'exam_id':this.mark_data.exam_id.id,
      'student_id':this.student_id,
      'subject_id':this.mark_data.subject_id.id,
      'class_id':this.mark_data.class_id.id,
      'section_id':this.mark_data.section_id.id,
      'mark':this.form.get('mark_obtained')?.value,
      'comment':this.form.get('comment')?.value
    };
    this.fetch.mark_update(data).subscribe({
      next:(res:any) => {
        this.loader.dismiss();
      if(res.code == 200){
        this.toastService.presentToast(res.response);
        this.form.patchValue({
          grade:res.data
        });
        this.modalController.dismiss();
          return res.data;
        }
        else{
          return false;
        }
      },
      error: (error:any) => {
        this.toastService.presentErrorToast("Error");
        return false;
      }
    });
  }

}
