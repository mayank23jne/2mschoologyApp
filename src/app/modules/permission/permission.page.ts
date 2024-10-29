import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.page.html',
  styleUrls: ['./permission.page.scss'],
})
export class PermissionPage implements OnInit {


  user_id: any;
  classList: any;
  
  formData: any;
  role: any;
  class_id: any;
  section_id: any = "";
  search: any = "";
  permissions: any = [];
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {
  }
  ngOnInit() {
    
  }

  onFilterChange(event: { class: string, section: string, student_id: any }) {
    this.formData = new FormData();
    this.class_id = event?.class;
    this.section_id = event?.section;

    this.formData.append('class_id', this.class_id);
    this.formData.append('section_id', this.section_id);
    this.list(this.formData);
  }
  list(formData:any){
    this.fetch.permissionsList(formData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.permissions = res.data;
          console.log(this.permissions);
        }
        else{
          this.permissions = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  onToggleChange(teacher: any, column: string) {

    const updatedValue = teacher[column] ;

    const updateData = {
      class_id:this.class_id,
      section_id:this.section_id,
      teacher_id: teacher.teacher_id,
      column_name: column,
      value: updatedValue
    };
    this.fetch.updateTeacherPermission(updateData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
        this.toastService.presentToast(res.response);
        this.formData.append('class_id', this.class_id);
        this.formData.append('section_id', this.section_id);
        this.list(this.formData);
        }
        else{
          this.permissions = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.toastService.presentToast(error);
        this.loader.dismiss();
      }
    });

    
  }
}
