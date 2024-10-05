import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./modules/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/students/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./modules/teachers/teacher/teacher.module').then( m => m.TeacherPageModule)
  },
  {
    path: 'student-info',
    loadChildren: () => import('./modules/modals/student-info/student-info.module').then( m => m.StudentInfoPageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./modules/exam/exam.module').then( m => m.ExamPageModule)
  },
  {
    path: 'mark',
    loadChildren: () => import('./modules/marks/marks.module').then( m => m.MarksPageModule)
  },
  {
    path: 'add-assignment',
    loadChildren: () => import('./modules/modals/add-assignment/add-assignment.module').then( m => m.AddAssignmentPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./modules/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./modules/subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./modules/syllabus/syllabus.module').then( m => m.SyllabusPageModule)
  },
  {
    path: 'add-syllabus',
    loadChildren: () => import('./modules/modals/add-syllabus/add-syllabus.module').then( m => m.AddSyllabusPageModule)
  },
  {
    path: 'take-attendance',
    loadChildren: () => import('./modules/modals/take-attendance/take-attendance.module').then( m => m.TakeAttendancePageModule)
  },
  {
    path: 'event_calendar',
    loadChildren: () => import('./modules/events-calender/events-calender.module').then( m => m.EventsCalenderPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./modules/progress-report/progress-report.module').then( m => m.ProgressReportPageModule)
  },
  {
    path: 'create-progress-report',
    loadChildren: () => import('./modules/modals/create-progress-report/create-progress-report.module').then( m => m.CreateProgressReportPageModule)
  },
  {
    path: 'student-edit',
    loadChildren: () => import('./modules/modals/student-edit/student-edit.module').then( m => m.StudentEditPageModule)
  },
  {
    path: 'edit-progress-report',
    loadChildren: () => import('./modules/modals/edit-progress-report/edit-progress-report.module').then( m => m.EditProgressReportPageModule)
  },
  {
    path: 'grade',
    loadChildren: () => import('./modules/grades/grades.module').then( m => m.GradesPageModule)
  },
  {
    path: 'edit-assignment',
    loadChildren: () => import('./modules/modals/edit-assignment/edit-assignment.module').then( m => m.EditAssignmentPageModule)
  },
  {
    path: 'submit-assignment',
    loadChildren: () => import('./modules/modals/submit-assignment/submit-assignment.module').then( m => m.SubmitAssignmentPageModule)
  },
  {
    path: 'update-marks',
    loadChildren: () => import('./modules/modals/update-marks/update-marks.module').then( m => m.UpdateMarksPageModule)
  },
  {
    path: 'routine',
    loadChildren: () => import('./modules/routine/routine.module').then( m => m.RoutinePageModule)
  },
  {
    path: 'class-routine-info',
    loadChildren: () => import('./modules/modals/class-routine-info/class-routine-info.module').then( m => m.ClassRoutineInfoPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./modules/invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'print-invoice',
    loadChildren: () => import('./modules/modals/print-invoice/print-invoice.module').then( m => m.PrintInvoicePageModule)
  },
  {
    path: 'view-assignment',
    loadChildren: () => import('./modules/modals/view-assignment/view-assignment.module').then( m => m.ViewAssignmentPageModule)
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./modules/modals/make-payment/make-payment.module').then( m => m.MakePaymentPageModule)
  },
  {
    path: 'invoice-info/:id',
    loadChildren: () => import('./modules/invoice-info/invoice-info.module').then( m => m.InvoiceInfoPageModule)
  },
  {
    path: 'submit-grade',
    loadChildren: () => import('./modules/modals/submit-grade/submit-grade.module').then( m => m.SubmitGradePageModule)
  },
  {
    path: 'stripe-payment',
    loadChildren: () => import('./modules/modals/stripe-payment/stripe-payment.module').then( m => m.StripePaymentPageModule)
  },
  {
    path: 'parent',
    loadChildren: () => import('./modules/parents/parents.module').then( m => m.ParentsPageModule)
  },
  {
    path: 'add-master',
    loadChildren: () => import('./modules/modals/add-master/add-master.module').then( m => m.AddMasterPageModule)
  },
  {
    path: 'add-user-master',
    loadChildren: () => import('./modules/modals/add-user-master/add-user-master.module').then( m => m.AddUserMasterPageModule)
  },
  {
    path: 'add-teacher',
    loadChildren: () => import('./modules/modals/add-teacher/add-teacher.module').then( m => m.AddTeacherPageModule)
  },
  {
    path: 'add-teacher-permission',
    loadChildren: () => import('./modules/modals/add-teacher-permission/add-teacher-permission.module').then( m => m.AddTeacherPermissionPageModule)
  },
  {
    path: 'accountant',
    loadChildren: () => import('./modules/accountant/accountant.module').then( m => m.AccountantPageModule)
  },
  {
    path: 'librarian',
    loadChildren: () => import('./modules/librarian/librarian.module').then( m => m.LibrarianPageModule)
  },
  {
    path: 'promotion',
    loadChildren: () => import('./modules/promotion/promotion.module').then( m => m.PromotionPageModule)
  },
  {
    path: 'add-exam-master',
    loadChildren: () => import('./modules/modals/add-exam-master/add-exam-master.module').then( m => m.AddExamMasterPageModule)
  },
  {
    path: 'permission',
    loadChildren: () => import('./modules/permission/permission.module').then( m => m.PermissionPageModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./modules/department/department.module').then( m => m.DepartmentPageModule)
  },
  {
    path: 'class_room',
    loadChildren: () => import('./modules/class-room/class-room.module').then( m => m.ClassRoomPageModule)
  },
  {
    path: 'manage_class',
    loadChildren: () => import('./modules/manage-class/manage-class.module').then( m => m.ManageClassPageModule)
  },
  {
    path: 'student/create',
    loadChildren: () => import('./modules/admission/admission.module').then( m => m.AdmissionPageModule)
  },
  {
    path: 'school_settings',
    loadChildren: () => import('./modules/school-settings/school-settings.module').then( m => m.SchoolSettingsPageModule)
  },
  {
    path: 'payment_settings',
    loadChildren: () => import('./modules/payment-settings/payment-settings.module').then( m => m.PaymentSettingsPageModule)
  },
  {
    path: 'update_plan',
    loadChildren: () => import('./modules/update-plan/update-plan.module').then( m => m.UpdatePlanPageModule)
  },
  {
    path: 'attendance_report',
    loadChildren: () => import('./modules/attendance-report/attendance-report.module').then( m => m.AttendanceReportPageModule)
  },
  {
    path: 'class-routine-add',
    loadChildren: () => import('./modules/modals/class-routine-add/class-routine-add.module').then( m => m.ClassRoutineAddPageModule)
  },
  {
    path: 'add-expense-category',
    loadChildren: () => import('./modules/modals/add-expense-category/add-expense-category.module').then( m => m.AddExpenseCategoryPageModule)
  },
  {
    path: 'expense_category',
    loadChildren: () => import('./modules/expense-category/expense-category.module').then( m => m.ExpenseCategoryPageModule)
  },
  {
    path: 'expense',
    loadChildren: () => import('./modules/expense/expense.module').then( m => m.ExpensePageModule)
  },
  {
    path: 'unpaid-invoice-list',
    loadChildren: () => import('./modules/modals/unpaid-invoice-list/unpaid-invoice-list.module').then( m => m.UnpaidInvoiceListPageModule)
  },
  {
    path: 'sendsmssetting',
    loadChildren: () => import('./modules/sendsmssetting/sendsmssetting.module').then( m => m.SendsmssettingPageModule)
  },
  {
    path: 'sms',
    loadChildren: () => import('./modules/sms/sms.module').then( m => m.SmsPageModule)
  },
  {
    path: 'payment_report',
    loadChildren: () => import('./modules/payment-report/payment-report.module').then( m => m.PaymentReportPageModule)
  },
  {
    path: 'joint-invoice-master',
    loadChildren: () => import('./modules/modals/joint-invoice-master/joint-invoice-master.module').then( m => m.JointInvoiceMasterPageModule)
  },
  {
    path: 'invoice-master',
    loadChildren: () => import('./modules/modals/invoice-master/invoice-master.module').then( m => m.InvoiceMasterPageModule)
  },
  {
    path: 'payment-report-info',
    loadChildren: () => import('./modules/modals/payment-report-info/payment-report-info.module').then( m => m.PaymentReportInfoPageModule)
  },
  {
    path: 'mass-invoice-master',
    loadChildren: () => import('./modules/modals/mass-invoice-master/mass-invoice-master.module').then( m => m.MassInvoiceMasterPageModule)
  },
  {
    path: 'joint-mass-invoice-master',
    loadChildren: () => import('./modules/modals/joint-mass-invoice-master/joint-mass-invoice-master.module').then( m => m.JointMassInvoiceMasterPageModule)
  },
  {
    path: 'manual-payment',
    loadChildren: () => import('./modules/modals/manual-payment/manual-payment.module').then( m => m.ManualPaymentPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'schools',
    loadChildren: () => import('./modules/schools/schools.module').then( m => m.SchoolsPageModule)
  },
  {
    path: 'school_permission',
    loadChildren: () => import('./modules/school-permission/school-permission.module').then( m => m.SchoolPermissionPageModule)
  },
  {
    path: 'generateinvoice',
    loadChildren: () => import('./modules/generateinvoice/generateinvoice.module').then( m => m.GenerateinvoicePageModule)
  },
  {
    path: 'admin-master',
    loadChildren: () => import('./modules/modals/admin-master/admin-master.module').then( m => m.AdminMasterPageModule)
  },
  {
    path: 'school-master',
    loadChildren: () => import('./modules/modals/school-master/school-master.module').then( m => m.SchoolMasterPageModule)
  },
  {
    path: 'add-plan-master',
    loadChildren: () => import('./modules/modals/add-plan-master/add-plan-master.module').then( m => m.AddPlanMasterPageModule)
  },
  {
    path: 'plan_settings',
    loadChildren: () => import('./modules/plan-settings/plan-settings.module').then( m => m.PlanSettingsPageModule)
  },
  {
    path: 'smtp_settings',
    loadChildren: () => import('./modules/smtp-settings/smtp-settings.module').then( m => m.SmtpSettingsPageModule)
  },
  {
    path: 'system_settings',
    loadChildren: () => import('./modules/system-settings/system-settings.module').then( m => m.SystemSettingsPageModule)
  },
  {
    path: 'create-invoice',
    loadChildren: () => import('./modules/modals/create-invoice/create-invoice.module').then( m => m.CreateInvoicePageModule)
  },
  {
    path: 'invoice-detail',
    loadChildren: () => import('./modules/modals/invoice-detail/invoice-detail.module').then( m => m.InvoiceDetailPageModule)
  },
  {
    path: 'create-client',
    loadChildren: () => import('./modules/modals/create-client/create-client.module').then( m => m.CreateClientPageModule)
  },
  {
    path: 'invoice-print',
    loadChildren: () => import('./modules/modals/invoice-print/invoice-print.module').then( m => m.InvoicePrintPageModule)
  },
  {
    path: 'website_settings',
    loadChildren: () => import('./modules/website-settings/website-settings.module').then( m => m.WebsiteSettingsPageModule)
  },
  {
    path: 'about_us',
    loadChildren: () => import('./modules/web-settings/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'privacy_policy',
    loadChildren: () => import('./modules/web-settings/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./modules/web-settings/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'general_settings',
    loadChildren: () => import('./modules/web-settings/general-settings/general-settings.module').then( m => m.GeneralSettingsPageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./modules/web-settings/others/others.module').then( m => m.OthersPageModule)
  },
  {
    path: 'sub-invoices',
    loadChildren: () => import('./modules/modals/sub-invoices/sub-invoices.module').then( m => m.SubInvoicesPageModule)
  },
  {
    path: 'print-report',
    loadChildren: () => import('./modules/modals/print-report/print-report.module').then( m => m.PrintReportPageModule)
  },
  {
    path: 'online-payment',
    loadChildren: () => import('./modules/modals/online-payment/online-payment.module').then( m => m.OnlinePaymentPageModule)
  },
  {
    path: 'student-excel',
    loadChildren: () => import('./modules/modals/student-excel/student-excel.module').then( m => m.StudentExcelPageModule)
  },
  {
    path: 'image-preview',
    loadChildren: () => import('./modules/modals/image-preview/image-preview.module').then( m => m.ImagePreviewPageModule)
  },
  {
    path: 'upload-csv-master',
    loadChildren: () => import('./modules/modals/upload-csv-master/upload-csv-master.module').then( m => m.UploadCsvMasterPageModule)
  },
  {
    path: 'invoice-chart',
    loadChildren: () => import('./modules/modals/invoice-chart/invoice-chart.module').then( m => m.InvoiceChartPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
