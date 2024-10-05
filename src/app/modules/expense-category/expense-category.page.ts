import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddExpenseCategoryPage } from '../modals/add-expense-category/add-expense-category.page';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.page.html',
  styleUrls: ['./expense-category.page.scss'],
})
export class ExpenseCategoryPage implements OnInit {
  expenseCategoryList:any;
  search:any;
  formData:any;  
  role:any;
  
  constructor(private http: HttpClient, private toastService: ToastService, private fetch: SchoolDataService, private loader: LoaderService, private data: DataService, private modalController: ModalController) {}
  
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
    });
    this.formData = new FormData();
    this.list(this.formData);
  }
  
  list(data:any){
    this.loader.present();
    this.fetch.expenseCategory(data).subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.loader.dismiss();
        console.log(res);
          this.expenseCategoryList = res.data;
        }
        else{
          this.expenseCategoryList = "";
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
    this.expenseCategoryList= this.expenseCategoryList.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search.toLowerCase()));
  }
  
  searchCancel(){
    this.search = "";
    this.formData = new FormData();
    this.list(this.formData);
  }
  
  delete(id: any) {
    this.data.presentAlertConfirm().then((res) => {
      if (res == true) {
        const formData = {'id':id};
        this.fetch.deleteExpenseCategory(formData).subscribe({
          next: (res: any) => {
            if (res.code == 200) {
              this.toastService.presentToast(res.response);
              this.ngOnInit();
            } else {
              this.toastService.presentErrorToast(res.response);
            }
          },
          error: (error: any) => {
          }
        });
      }
    });
  }
  
  async openEditModal(item:any) {
    const modal = await this.modalController.create({
      component: AddExpenseCategoryPage,
      cssClass: '',
      componentProps: {
        title: "Edit expense category",
        edit:true,
        editCategoryData:item
      }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.ngOnInit();
    });
  
    return await modal.present();
  }
  
  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddExpenseCategoryPage,
      cssClass: '',
      componentProps: {
        title: "Add expense category",
        edit:false,
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  

}
