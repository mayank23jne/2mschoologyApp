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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
