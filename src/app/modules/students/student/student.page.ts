import { Component, OnInit } from '@angular/core';
import { StudentInfoPage } from '../../modals/student-info/student-info.page';
import { ModalController } from '@ionic/angular';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StudentEditPage } from '../../modals/student-edit/student-edit.page';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  user_id:any;
  formData:any;
  role:any;
  imgPath:any;
  demoimgPath:any = "../../assets/profile_img.png";
  studentData:any;
  studentDetail:any;
  search:any = "";
  ShowDelete:any = false;
  selectedStudentIds: Set<number> = new Set(); // Holds the IDs of selected students
  selectAllChecked = false;
  constructor(private toastService: ToastService,private data: DataService,private fetch: SchoolDataService,private loader: LoaderService,private modalController: ModalController) { }

  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.user_id = localStorage.getItem("userId");
  }

  ionViewDidEnter(){
    this.loader.present();
    this.list();
    this.search = "";
  }
  
  async openDetailModal(id: any) {
    if(this.studentData){
    const modal = await this.modalController.create({
      component: StudentInfoPage,
      componentProps: {
        title: 'Student Info',
        id:id,
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      const formData = new FormData();
      this.list();
    });
    return await modal.present();
  }
  }
  list(){
    this.fetch.studentData().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
         this.studentData = res.data;
        }
        else{
          this.studentData = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {
    this.formData = new FormData();
    this.studentData = this.studentData.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
    console.log(this.studentData);
  }

  searchCancel(){
    this.search = "";
    this.list();
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: StudentEditPage,
      cssClass: '',
      componentProps: {
        title: "Add Student"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }


  isSelected(student_id: number): boolean {
    return this.selectedStudentIds.has(student_id);
  }

  // Handle individual student selection
  onStudentCheckChange(student_id: number, event: any) {
    if (event.detail.checked) {
      this.selectedStudentIds.add(student_id);
    } else {
      this.selectedStudentIds.delete(student_id);
    }
    this.updateSelectAllState();
    if(this.selectedStudentIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }

  // Toggle selection of all students
  toggleSelectAll() {
    if (this.selectAllChecked) {
      this.studentData.forEach((item: { student_id: number; }) => this.selectedStudentIds.add(item.student_id));
    } else {
      this.selectedStudentIds.clear();
    }
    if(this.selectedStudentIds.size > 0){
      this.ShowDelete = true;
    }else{
      this.ShowDelete = false;
    }
  }

  // Update the state of "Select All" checkbox
  updateSelectAllState() {
    this.selectAllChecked = this.studentData.length === this.selectedStudentIds.size;
  }

  // Delete selected students and get the JSON array of selected student IDs
  deleteSelectedStudents() {
    // Convert the Set to an array and then to a JSON string
    const selectedStudentIdsArray = Array.from(this.selectedStudentIds);

    const selectedStudentIdsString = `{${selectedStudentIdsArray.join(',')}}`;
 
    console.log('Selected Student IDs:', selectedStudentIdsString);

    this.delete(selectedStudentIdsString);
     
  }
  delete(ids: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        console.log(ids);
        // const formData = new FormData();
        // formData.append('student_ids', ids);
        // this.fetch.deleteDepartment(formData).subscribe({
        //   next: (res: any) => {
        //     if (res.code == 200) {
        //       this.toastService.presentToast(res.response);
        //       this.studentData = this.studentData.filter((item: { student_id: number; }) => !this.selectedStudentIds.has(item.student_id));
        //       this.selectedStudentIds.clear(); 
        //       this.selectAllChecked = false; 
        //     } else {
        //       this.toastService.presentErrorToast(res.response);
        //     }
        //   },
        //   error: (error: any) => {
        //   }
        // });
      }
    });
  }
  
}
