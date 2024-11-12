import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.page.html',
  styleUrls: ['./add-assignment.page.scss'],
})
export class AddAssignmentPage implements OnInit {
  heading_title: any;
  form!: FormGroup;
  user_id: any;
  sections: any;
  classes: any;
  filteredStudents = [];
  selectedStudentIds: any = new Set<number>();
  students: any;
  minDate: any;
  defaultDate: any;
  homeworkId: any;
  homeworkData: any;
  sections_list: any;
  pdf_link: any;
  subjects: any;
  syllabus_id: any;
  syllabus: any;
  syllabus_file: any = "";
  selectedClass: any;
  selectedSection: any;
  syllabus_file_name: any;

  constructor(private iab: InAppBrowser, private data: DataService, private popoverController: PopoverController, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.form = this.fb.group({
      assignment: ["", Validators.required],
      last_date: [""],
      class_id: ["", Validators.required],
      section_id: ["", Validators.required],
      line_number: ["", Validators.required],
      page_number: ["", Validators.required],
      subject_id: ["", Validators.required]
    });
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.heading_title = this.navParams.get('title');
    this.user_id = localStorage.getItem("userId");
    this.homeworkId = this.navParams.get('id');

    if (this.homeworkId) {
      this.loader.present();

      let formD = {'homework_id': this.homeworkId };
      this.fetch.getHomeworkById(formD).subscribe({
        next: (res: any) => {
          if (res) {
            this.homeworkData = res.data.homework;
            setTimeout(() => {
              this.form.patchValue({
                assignment: this.homeworkData.assignment,
                last_date: this.homeworkData.last_date,
                class_id: this.homeworkData.class_id,
                section_id: this.homeworkData.section_id,
                page_number: this.homeworkData.page_number,
                line_number: this.homeworkData.line_number,
              });
              this.onClassChange();
              this.loader.dismiss();
            }, 3000);
            this.loader.dismiss();
          }
        },
        error: (error: any) => {
          this.loader.dismiss();
        }
      });
    }
    const formData = new FormData();

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

    const defaultYear = today.getFullYear();
    const defaultMonth = today.getMonth() + 1;
    const defaultDay = today.getDate() + 1;
    this.defaultDate = new Date(defaultYear, defaultMonth - 1, defaultDay).toISOString().split('T')[0];

    this.form.get('last_date')?.setValue(this.defaultDate);

  }
  add() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.syllabus_file) {
          this.loader.present();
          let selectedStudentIdsArray: any = Array.from(this.selectedStudentIds);
          const formData = new FormData();
          formData.append('selected_students', selectedStudentIdsArray.join(','));
          formData.append('subject_id', this.form.get('subject_id')?.value);
          this.form.value.last_date = this.form.value.last_date;
          for (const key in this.form.value) {
            if (this.form.value.hasOwnProperty(key)) {
              formData.append(key, this.form.value[key]);
            }
          }
          this.fetch.createStudentsHomework(formData).subscribe({
            next: (res: any) => {
              if (res.code == 200) {
                this.loader.dismiss();
                this.toastService.presentToast(res.response);
                this.modalController.dismiss();

              } else {
                this.toastService.presentErrorToast(res.response);
                this.loader.dismiss();
              }

              this.loader.dismiss();
            },
            error: (error: any) => {
              this.loader.dismiss();
              this.toastService.presentErrorToast("Error");
              this.modalController.dismiss();
            }
          });
        }else{
          this.toastService.presentErrorToast("Syllabus not found for selected class section");
        }
       
    } else {
      this.toastService.presentErrorToast("Fields Required");
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onClassChange() {
    
    this.selectedClass = this.form.get('class_id')?.value;
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('class_id', this.form.get('class_id')?.value);
    this.sections = this.sections_list.filter((item: { class_id: string; }) => item.class_id === this.selectedClass);
    this.form.patchValue({
      section_id: this.sections[0].id,
    });

    this.fetch.subjectList(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.subjects = res.data;
        }
      },
      error: (error: any) => {

      }
    });
    this.onSubjectChange();
    this.filterStudents();
  }
  onSubjectChange() {
    this.syllabus_reset();
    const formData = new FormData();
    formData.append('class_id', this.form.get('class_id')?.value);
    formData.append('section_id', this.form.get('section_id')?.value);
    formData.append('subject_id', this.form.get('subject_id')?.value);
    if(this.form.get('class_id')?.value && this.form.get('section_id')?.value && this.form.get('subject_id')?.value){
      this.fetch.getAllSyllabusData(formData).subscribe({
        next: (res: any) => {
          if (res) {
          
            this.syllabus = res.data[0];
            this.syllabus_file = res.data[0]?.file;
            this.syllabus_file_name = res.data[0]?.file_name;

          }
        },
        error: (error: any) => {
          this.syllabus_reset();
        }
      });
    }
  }
  async resetDate() {
    this.form.get('last_date')?.reset("");
    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
  }

  formatDate(dateTimeStr: string): string {
    const datePart = dateTimeStr.split('T')[0];
    return this.data.dbformatDate(datePart);
  }

  async savedate() {

    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss();
    }
    if (this.form.value.last_date) {
      this.form.value.last_date = this.form.value.last_date;
    }
  }

  onSectionChange(event: any) {
    this.onSubjectChange();
    this.filterStudents();
  }

  filterStudents() {
    
    const classId = this.form.get('class_id')?.value;
    const sectionId = this.form.get('section_id')?.value;
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('class_id', classId);
    formData.append('section_id', sectionId);
    this.fetch.studentData(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          this.students = res.data;
          this.students = res.data.filter((student: any) => student.class_id === classId && student.section_id === sectionId);
        }
        else {
          this.students = "";
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });

  }
  isSelected(studentId: number): boolean {
    return this.selectedStudentIds.has(studentId);
  }

  toggleSelection(studentId: number, event: any) {
    if (event.detail.checked) {
      this.selectedStudentIds.add(studentId);
    } else {
      this.selectedStudentIds.delete(studentId);
    }
  }

  generateUniqueFileName(baseName: any) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    return `${baseName}_${timestamp}.pdf`;
  }
  async open(fileUrl: any) {
    const options: any = {
      location: 'no',
      toolbar: 'no',
      hideurlbar: 'yes'
    };
    const fileName = this.syllabus_file_name;
    const pageno = '1';
    const pageNumber = pageno && pageno.includes(',') ? pageno.split(',')[0] : pageno;
    fileUrl = `https://2mschoology.com/api/pdf/${fileName}/${pageNumber}`;
    const browser = this.iab.create(fileUrl, '_self', options);
    browser.show();
  }
  syllabus_reset(){
    this.syllabus = [];
    this.syllabus_file = "";
    this.syllabus_file_name = "";
  }
}
