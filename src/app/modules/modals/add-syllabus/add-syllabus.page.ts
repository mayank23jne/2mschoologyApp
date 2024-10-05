import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.page.html',
  styleUrls: ['./add-syllabus.page.scss'],
})
export class AddSyllabusPage implements OnInit {

  heading_title:any;
  form!: FormGroup;
  classes:any;
  sections:any;
  subjects:any;
  selectedFile:any;
  user_id:any;
  sections_list:any;

  constructor(private toastService:ToastService,private loader: LoaderService,private fetch: SchoolDataService,private fb: FormBuilder,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.user_id = localStorage.getItem("userId");
    this.form = this.fb.group({
      title: ['', Validators.required],
      syllabus_file:['',Validators.required],
      class:["",Validators.required],
      section:["",Validators.required],
      subject:["",Validators.required]
    });
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    this.fetch.classList(formData).subscribe({
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
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('class_id', this.form.get('class')?.value);

    this.fetch.subjectList(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.subjects = res.data;
        }
      },
      error: (error: any) => {

      }
    });
    this.sections =  this.sections_list.filter((item: { class_id: string; }) => item.class_id === this.form.get('class')?.value);
    this.form.patchValue({
      section: this.sections[0].id,
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  loadProfileFromDevice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    this.selectedFile = inputElement?.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            //this.selectedFile = reader.result as string; 
        };
        reader.readAsDataURL(file);
    } else {
        this.selectedFile = "";
    }
}
  add(){
    this.form.markAllAsTouched();
    const formData = new FormData();

    formData.append('user_id',this.user_id);
    formData.append('title',this.form.get('title')?.value);
    formData.append('class_id',this.form.get('class')?.value);
    formData.append('section_id',this.form.get('section')?.value);
    formData.append('subject_id',this.form.get('subject')?.value);
    formData.append('syllabus_file', this.selectedFile);
    this.loader.present();
    this.fetch.syllabusCreate(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.toastService.presentToast(res.response);
        this.modalController.dismiss();
        this.loader.dismiss();
      }else{
        this.toastService.presentErrorToast(res.response);
      }
      
      this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  

}
