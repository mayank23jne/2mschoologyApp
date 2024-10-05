import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ModalController, NavParams ,PopoverController} from '@ionic/angular'
import { LoaderService } from 'src/app/core/services/loader.service'
import { SchoolDataService } from 'src/app/core/services/school-data.service'
import { ToastService } from 'src/app/core/services/toast.service'

@Component({
  selector: 'app-add-expense-category',
  templateUrl: './add-expense-category.page.html',
  styleUrls: ['./add-expense-category.page.scss'],
})
export class AddExpenseCategoryPage implements OnInit {
  heading_title: string = ''
  editCategoryData: any
  editExpenseData: any
  categoryForm!: FormGroup
  setDefaultDate: any 
  expenseForm!: FormGroup
  editFrom: boolean = false
  categories: any
  defaultDate:any
  expenseModel: boolean = false
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private toastService: ToastService,
    private loader: LoaderService,
    private fetch: SchoolDataService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.initializeForms()
  }
  initializeForms() {
    this.heading_title = this.navParams.get('title');
    this.categories = this.navParams.get('categories');
    this.editCategoryData = this.navParams.get('editCategoryData');
    this.editExpenseData = this.navParams.get('editExpenseData');
    this.editFrom = this.navParams.get('edit');
    this.expenseModel = this.navParams.get('expenseModel') ?? false;
    this.setDefaultDate = this.editExpenseData ? this.editExpenseData.date : new Date().toISOString().split('T')[0];

    if (this.expenseModel) {
      const expenseFormControls: { [key: string]: any[] } = {
        date: [this.setDefaultDate ||'', Validators.required],
        amount: [this.editExpenseData?.amount||'', [Validators.required, Validators.min(1)]],
        expense_category_id: [this.editExpenseData?.expense_category_id ||11, Validators.required],
      }
      if (this.editFrom) {
        expenseFormControls['id'] = [this.editExpenseData?.id || '']
      }
      this.expenseForm = this.fb.group(expenseFormControls)
    } else {
      const categoryFormControls: { [key: string]: any[] } = {
        name: [this.editCategoryData?.name || '', Validators.required],
      }
      if (this.editFrom) {
        categoryFormControls['id'] = [this.editCategoryData?.id || '']
      }
      this.categoryForm = this.fb.group(categoryFormControls)
    }
  }

  closeModal() {
    this.modalController.dismiss()
  }
  submit_category() {
    const formData = this.categoryForm.value
    this.fetch.addExpenseCategory(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response)
          this.modalController.dismiss()
          this.loader.dismiss()
        } else {
          this.toastService.presentErrorToast(res.response)
        }
        this.loader.dismiss()
      },
      error: (error: any) => {
        this.loader.dismiss()
      },
    })
  }
  submit_expense() {
    const formData = this.expenseForm.value
    console.log(formData);
    
    this.fetch.addExpense(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response)
          this.modalController.dismiss()
          this.loader.dismiss()
        } else {
          this.toastService.presentErrorToast(res.response)
        }
        this.loader.dismiss()
      },
      error: (error: any) => {
        this.loader.dismiss()
      },
    })
  }
  async savedate(){
  const popover = await this.popoverController.getTop();
  if (popover) {
    popover.dismiss();
  }
}
}
