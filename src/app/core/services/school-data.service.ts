import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { AuthInterceptor } from '../intercepter/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class SchoolDataService {

  constructor(private http: HttpClient, private authInterceptor: AuthInterceptor) { }

  private makeApiCall(endpoint: string, method: string, data: any): Observable<any> {
    let payload: any;
    
      if (data instanceof FormData) {
        payload = this.formDataToJson(data);
      } else {
        payload = data;
      }
    
    const options: HttpOptions = this.authInterceptor.interceptRequest({
      url: `${environment.apiUrl}/` + endpoint,
      method: method,
      data: payload,
    });

    return from(CapacitorHttp.request(options)).pipe(
      map(response => response.data),
      catchError(error => {
        // Handle error here, for example, checking if it's a no internet error
        if (error.message === 'Network Error' || error.status === 0) {
          console.error('No internet connection or server unreachable');
          return of({ error: true, message: 'No internet connection or server unreachable' });
        }
  
        // Handle other types of errors
        console.error('An error occurred:', error);
        return of({ error: true, message: error.message || 'An unexpected error occurred' });
      })
    );
  }
  formDataToJson(formData: FormData): any {
    const object: any = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  }
  login(data: any): Observable<any> {
    const endpoint = `login`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  forgot_password(data: any): Observable<any> {
    const endpoint = `forgetPassword`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  changePassword(data: any): Observable<any> {
    const endpoint = `changePassword`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  checkProfileExists(data: any = ""): Observable<any> {
    const endpoint = `getProfileImage`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getDashboardData(data: any = ""): Observable<any> {
    const endpoint = `dashboardData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  classList(data: any = ""): Observable<any> {
    const endpoint = `getClassSectionParentsData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  studentData(data: any=""): Observable<any> {
    const endpoint = `studentData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  studentUpdate(data: any): Observable<any> {
    const endpoint = `studentUpdateData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  studentDelete(data: any): Observable<any> {
    const endpoint = `studentDeleteData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getAllTeachersData(data: any = ""): Observable<any> {
    const endpoint = `teacherData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  subjectList(data: any): Observable<any> {
    const endpoint = `subjectData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getStudentDetail(data: any = ""): Observable<any> {
    const endpoint = `StudentSingleData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  calendarEventData(data: any): Observable<any> {
    const endpoint = `eventCalendar`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getAllSyllabusData(data : any): Observable<any> {
    const endpoint = `syllabusData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  syllabusDelete(data: any): Observable<any> {
    const endpoint = `syllabusDelete`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  // syllabusCreate(data: any): Observable<any> {
  //   const endpoint = `syllabuscreatedata`;
  //   return this.makeApiCall(endpoint, 'POST', data);
  // }
  syllabusCreate(data : any = ""): Observable<any> {
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(`${environment.apiUrl}/syllabuscreatedata`,data,{ headers });
  }
  examData(data: any=""): Observable<any> {
    const endpoint = `exam`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getHomeworkData(data: any): Observable<any> {
    const endpoint = `studentshomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  createStudentsHomework(data: any): Observable<any> {
    const endpoint = `createstudentshomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  updateHomeworkData(data: any): Observable<any> {
    const endpoint = `updatestudentshomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteHomeWork(data: any): Observable<any> {
    const endpoint = `deletestudentshomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getHomeworkById(data: any): Observable<any> {
    const endpoint = `getstudentshomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getProfileData(data: any = ""): Observable<any> {
    const endpoint = `getProfile`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  updateProfileData(data: any): Observable<any> {
    const endpoint = `updateProfile`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  progressReportList(data: any = ""): Observable<any> {
    const endpoint = `getprogressdata`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  progressReportDelete(data: any = ""): Observable<any> {
    const endpoint = `deleteProgressReport`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getProgressReportById(data: any = ""): Observable<any> {
    const endpoint = `getProgressReport`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  createProgressReport(data: any = ""): Observable<any> {
    const endpoint = `createprogressdata`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  updateProgressReport(data: any = ""): Observable<any> {
    const endpoint = `updateProgressReport`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  grades(data: any = ""): Observable<any> {
    const endpoint = `grade`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  uploadhomework(data: any = ""): Observable<any> {
    const endpoint = `uploadhomework`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getMenu(data: any = ""): Observable<any> {
    const endpoint = `getMenu`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getYear(data: any = ""): Observable<any> {
    const endpoint = `getYear`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getMonths(data: any = ""): Observable<any> {
    const endpoint = `getMonths`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getMarksData(data: any = ""): Observable<any> {
    const endpoint = `getMarkData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  mark_update(data: any = ""): Observable<any> {
    const endpoint = `mark_update`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getGradePoint(data: any = ""): Observable<any> {
    const endpoint = `gradePoint`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getAllRoutineData(data: any = ""): Observable<any> {
    const endpoint = `classroutine`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getAttendanceData(data: any = ""): Observable<any> {
    const endpoint = `getMonthlyAttendanceData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  getAttendanceStudentData(data: any = ""): Observable<any> {
    const endpoint = `takeAttendanceData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  submitAttendance(data: any = ""): Observable<any> {
    const endpoint = `createtakeattendance`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  studentFeeInvoice(data : any): Observable<any> {
    const endpoint = `studentFeeInvoice`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  studentFeeManagerData(data : any = ""): Observable<any> {
    const endpoint = `studentFeeManager`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  updateStudentGrade(data : any = ""): Observable<any> {
    const endpoint = `updateSubmittedFileStatus`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  payment_stripe(data : any = ""): Observable<any> {
    const endpoint = `payment_stripe`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  payment_success(data : any = ""): Observable<any> {
    const endpoint = `payment_process_success`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  parentsData(data : any = ""): Observable<any> {
    const endpoint = `parentsData`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  // Admins api

  // User Masters
  viewUserMaster(data : any = ""): Observable<any> {
    const endpoint = `viewUserMaster`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  addUserMaster(data : any = ""): Observable<any> {
    const endpoint = `addUserMaster`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  userDelete(data : any = ""): Observable<any> {
    const endpoint = `deleteUserMaster`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  // Teacher Master
  addTeacherMaster(data : any = ""): Observable<any> {
    const endpoint = `addTeacher`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteTeacherMaster(data : any = ""): Observable<any> {
    const endpoint = `deleteTeacher`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  // Teacher Permissions
  permissionsList(data : any = ""): Observable<any> {
    const endpoint = `viewPermission`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  updateTeacherPermission(data : any = ""): Observable<any> {
    const endpoint = `modifyPermission`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  
  //Academic master
  addAdminssionSingleStudent(data : any = ""): Observable<any> {
    const endpoint = `addClass`;
    return this.makeApiCall(endpoint, 'POST', data);
  }

  // Class class room
  addClass(data : any = ""): Observable<any> {
    const endpoint = `addClass`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  viewClass(data : any = ""): Observable<any> {
    const endpoint = `viewClass`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteClass(data : any = ""): Observable<any> {
    const endpoint = `deleteClass`;
    return this.makeApiCall(endpoint, 'POST', data);
  }

  addClassRoom(data : any = ""): Observable<any> {
    const endpoint = `addClassRoom`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteClassRoom(data : any = ""): Observable<any> {
    const endpoint = `deleteClassRoom`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  viewClassRoom(data : any = ""): Observable<any> {
    const endpoint = `viewClassRoom`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
 
  //Subject
  addSubject(data : any = ""): Observable<any> {
    const endpoint = `addSubject`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteSubject(data : any = ""): Observable<any> {
    const endpoint = `deleteSubject`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  viewSubject(data : any = ""): Observable<any> {
    const endpoint = `viewSubject`;
    return this.makeApiCall(endpoint, 'POST', data);
  }

  // Department
  addDepartment(data : any = ""): Observable<any> {
    const endpoint = `addDepartment`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  viewDepartment(data : any = ""): Observable<any> {
    const endpoint = `viewDepartment`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteDepartment(data : any = ""): Observable<any> {
    const endpoint = `deleteDepartment`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  // Events calendar
  addEventCalendar(data : any = ""): Observable<any> {
    const endpoint = `addEventCalendar`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  deleteEventCalendarMaster(data : any = ""): Observable<any> {
    const endpoint = `deleteEventCalendarMaster`;
    return this.makeApiCall(endpoint, 'POST', data);
  }

  // Class routine
  addClassRoutine(data : any = ""): Observable<any> {
    const endpoint = `addClassRoutine`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  

  // Exam master

  addExam(data : any = ""): Observable<any> {
    const endpoint = `addExam`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  addGrade(data : any = ""): Observable<any> {
    const endpoint = `addGrade`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
  addPromotion(data : any = ""): Observable<any> {
    const endpoint = `addPromotion`;
    return this.makeApiCall(endpoint, 'POST', data);
  }
}
