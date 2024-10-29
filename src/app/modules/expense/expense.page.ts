import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddExpenseCategoryPage } from '../modals/add-expense-category/add-expense-category.page';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {
  expenseList: any[] = [];
  categoryListData: any[] = [];
  role: any;
  formData:any;
  selectedCategory: string = '';
  dateRange: any;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private fetch: SchoolDataService,
    private loader: LoaderService,
    private data: DataService,
    private modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.data.role$.subscribe((role) => {
      this.role = role;
    });
    this.formData = new FormData();
    this.loadCategoryList();
    this.filterExpenses();
  }

  selectedDate(newValue: any) {
    this.dateRange = newValue;
  }

  filterExpenses() {
    const formData = new FormData();
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    formData.append('startDate', this.formatDate(this.dateRange?.startDate || defaultStartDate) || '');
    formData.append('endDate', this.formatDate(this.dateRange?.endDate || defaultEndDate) || '');
    formData.append('expense_category_id', this.selectedCategory || '');

    this.loadExpenseList(formData);
  }


  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'MMMM dd, yyyy');
  }

 async loadCategoryList() {
  const res = await this.fetch.expenseCategory(this.formData).toPromise();
  if (res.code === 200) {
    this.categoryListData = res.data;
  } else {
    this.categoryListData = [];
  }
}


  async loadExpenseList(data: FormData) {
    await this.withLoader(async () => {
      const res = await this.fetch.expense(data).toPromise();
      if (res.code === 200) {
        this.expenseList = res.data;
      } else {
        this.expenseList = [];
        this.toastService.presentErrorToast(res.response);
      }
    });
  }

  async deleteExpense(id: any) {
    const confirm = await this.data.presentAlertConfirm();
    if (confirm) {
      await this.fetch.deleteExpense({ id }).toPromise().then((res: any) => {
        if (res.code === 200) {
          this.toastService.presentToast(res.response);
          this.filterExpenses();
        } else {
          this.toastService.presentErrorToast(res.response);
        }
      });
    }
  }

  async openEditModal(item: any) {
    const modal = await this.modalController.create({
      component: AddExpenseCategoryPage,
      componentProps: {
        title: 'Edit Expense',
        edit: true,
        editExpenseData: item,
        expenseModel: true,
        categories:this.categoryListData
      },
    });
    modal.onDidDismiss().then(() => this.filterExpenses());
    await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddExpenseCategoryPage,
      componentProps: {
        title: 'Add Expense',
        edit: false,
        expenseModel: true,
        categories:this.categoryListData
      },
    });
    modal.onDidDismiss().then(() => this.filterExpenses());
    await modal.present();
  }

  private async withLoader(callback: () => Promise<void>) {
    this.loader.present();
    try {
      await callback();
    } catch (error) {
      console.error(error);
    } finally {
      this.loader.dismiss();
    }
  }
}
