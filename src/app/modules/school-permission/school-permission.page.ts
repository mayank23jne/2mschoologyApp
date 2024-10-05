import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-school-permission',
  templateUrl: './school-permission.page.html',
  styleUrls: ['./school-permission.page.scss'],
})
export class SchoolPermissionPage implements OnInit {

  user_id: any;
  school_list: any;
  
  formData: any;
  role: any;
  class_id: any;
  section_id: any = "";
  search: any = "";
  permissions: any = [];
  school_id:number | undefined;
  showList:boolean = false;
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {
  }
  ngOnInit() {
    this.schoolList();
    
  }
  getKeys(item: any) {
    return Object.keys(item).filter(key => key !== 'school_name' && key !== 'id');
  }
  schoolList(){
    this.loader.present();
    this.fetch.viewSchool().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
          this.school_list = res.data;
        }
        else{
          this.school_list = [];
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  onFilterChange() {
    this.formData = new FormData();
    this.formData.append('school_id', this.school_id);
    this.list(this.formData);
  }
  list(formData:any){
    this.loader.present();
    this.fetch.assignedPermissionSchool(formData).subscribe({
      next:(res:any) => {
        this.loader.dismiss();
      if(res.code == 200){
       this.showList = true;
          this.permissions = res.data;
          
          this.permissions.forEach((item: { [x: string]: any; }) => {
            Object.keys(item).forEach(key => {
              if (item[key] === '1') {
                item[key] = true;
              } else if (item[key] === '0') {
                item[key] = false;
              }
            });
          });
          this.getKeys(this.permissions);
          console.log(this.permissions);
        }
        else{
          this.permissions = [];
          this.showList = false;
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  onToggleChange(school: any, column: string) {

    const updatedValue = school[column] ;

    const updateData = {
      school_id:this.school_id,
      column_name: column,
      value: updatedValue.toString()
    };
    this.fetch.updateAssignedPermission(updateData).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
        this.toastService.presentToast(res.response);
        this.formData.append('school_id', this.section_id);
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
