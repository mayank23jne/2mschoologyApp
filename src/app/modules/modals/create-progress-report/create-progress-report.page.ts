import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-create-progress-report',
  templateUrl: './create-progress-report.page.html',
  styleUrls: ['./create-progress-report.page.scss'],
})
export class CreateProgressReportPage implements OnInit {
  heading_title: any;
  form!: FormGroup;
  classes: any;
  sections: any;
  subjects: any;
  selectedFile: any;
  user_id: any;
  students: any;
  formData: any;
  formReport!: FormGroup;
  show: any = false;
  class_id: any = "";
  section_id: any = "";
  progressData: any;
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.user_id = localStorage.getItem('userId');
    this.formReport = this.fb.group({
      progressReportArr: this.fb.array([], this.atLeastOnePerformanceAndNoteFilledValidator()),
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onFilterChange(event: { class: string; section: string }) {
    this.formData = new FormData();
    this.class_id = event.class;
    this.section_id = event.section;
    this.formData.append('class_id', event.class);
    this.formData.append('section_id', event.section);
    this.filterStudents();
  }

  filterStudents() {
    this.loader.present();
    this.fetch.studentData(this.formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.loader.dismiss();
          this.show = true;
          this.students = res.data;
          this.formReport = this.fb.group({
            progressReportArr: this.fb.array(
              this.students.map((student: any) =>
                this.createReportControl(student)
              ),
              this.atLeastOnePerformanceAndNoteFilledValidator()
            ),
          });

        } else {
          this.students = "";
          this.loader.dismiss();
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }

  createReportControl(student: any): FormGroup {
    return this.fb.group({
      student_id: [student.user_id],
      name: [student.name],
      note: [''],
      performance: ['']
    });
  }

  getFilledRows() {
    const filledRows = this.progressReportArr.controls.filter((group: AbstractControl) => {
      const student_id = group.get('student_id')?.value;
      const note = group.get('note')?.value;
      const performance = group.get('performance')?.value;
      return student_id && note && performance;
    });

    return filledRows.map(group => group.value);
  }

  onSubmit() {
    if (this.formReport.invalid) {

      this.toastService.presentErrorToast("Please rate at least one student");
      return;
    }
    const filledRows = this.getFilledRows();
    this.progressData = JSON.stringify(filledRows);
    const formData = new FormData();
    formData.append('class_id', this.class_id);
    formData.append('section_id', this.section_id);
    formData.append('created_by', this.user_id);
    formData.append('student_list', this.progressData);

    this.fetch.createProgressReport(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.modalController.dismiss();
          this.toastService.presentToast(res.response);
          this.loader.dismiss();
        } else {
          this.toastService.presentErrorToast(res.response);
          this.loader.dismiss();
        }
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  get progressReportArr() {
    return this.formReport?.get('progressReportArr') as FormArray;
  }
  atLeastOnePerformanceAndNoteFilledValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }
      const hasAtLeastOneFilled = formArray.controls.some((group: AbstractControl) => {
        const performance = group.get('performance')?.value;
        const note = group.get('note')?.value;
        return performance && note;
      });

      return hasAtLeastOneFilled ? null : { atLeastOneRequired: true };
    };
  }
}
