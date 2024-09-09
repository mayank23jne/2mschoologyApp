import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-submit-grade',
  templateUrl: './submit-grade.page.html',
  styleUrls: ['./submit-grade.page.scss'],
})
export class SubmitGradePage implements OnInit {

  student_homework_data:any;
  form!: FormGroup;
  student_id:any;
  homework_id:any;
  homework_file:any;
  homework_file_name:any;
  constructor(private loader: LoaderService,private platform: Platform,private fileOpener: FileOpener,private iab: InAppBrowser,private fb: FormBuilder,private http:HttpClient,private toastService: ToastService,private fetch: SchoolDataService,private navParams: NavParams,private modalController: ModalController) {
  }
  ngOnInit() {

    this.student_homework_data = this.navParams.get('item');
    this.homework_file = this.student_homework_data.file;
    this.homework_file_name = this.student_homework_data.file_name;
    this.student_id = this.student_homework_data.student_id;
    this.homework_id = this.navParams.get('homework_id');
    
    this.form = this.fb.group({
      marks: ["marks", Validators.required],
      marks_value: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      feedback:["good", Validators.required]
    });
    this.onMarksChange('marks');
    this.form.get('marks')?.valueChanges.subscribe((value) => {
      this.onMarksChange(value);
    });
  }
  onMarksChange(value: string) {
    const marksValueControl = this.form.get('marks_value');
    if (value === 'marks') {
      marksValueControl?.setValidators([Validators.required, Validators.min(0), Validators.max(10)]);
    } else if (value === 'grades') {
      marksValueControl?.setValidators([Validators.required]);
    }
    marksValueControl?.updateValueAndValidity();
  }
  getFileNameFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
        return fileName ? fileName : '';
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onChange(event:any){
    console.log(event.target.value);
  }
  onFeedChange(event:any){
    console.log(event.target.value);
  }
  updateMarks(){
  if (this.form.valid) {
   let args = {'homework_id':this.homework_id,'student_id':this.student_id,'feedback':this.form.get('feedback')?.value,'marks_value':this.form.get('marks_value')?.value};
    this.fetch.updateStudentGrade(args).subscribe({
      next: (res: any) => {
      if (res.code == 200) {
        this.toastService.presentToast("Grade submitted");
        this.modalController.dismiss();
      }
      },
      error: (error: any) => {
        this.toastService.presentErrorToast("Something went wrong");
      }
    });
  }else{
    this.toastService.presentErrorToast("Form is invalid");
  }
}
async openFile(fileUrl: string) {
  const options: any = {
    location: 'no',
    toolbar: 'no',
    hideurlbar: 'yes'
  };
  const fileName = fileUrl.split('/').pop();
  fileUrl = `https://2mschoology.com/Api/studentFile/${fileName}`;
  const browser = this.iab.create(fileUrl, '_self', options);
  browser.show();
}
async openFile1(fileUrl: string) {
    this.loader.present();
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(async (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
    
      reader.onloadend = async () => {
        let base64data = reader.result as string;
        const base64Prefix = ';base64,';
        const base64Index = base64data.indexOf(base64Prefix);
        if (base64Index !== -1) {
          base64data = base64data.substring(base64Index + base64Prefix.length);
        }
        console.log(base64data);

        const fileExtension = this.getFileExtension(fileUrl);
        console.log(fileExtension);
        if (!fileExtension) {
          throw new Error('Unable to extract file extension');
        }
        const fileName = this.generateUniqueFileName('Syllabus') + fileExtension;
        try {
          const result = await Filesystem.writeFile({
            path: fileName,
            data: base64data,
            directory: Directory.Documents,
          });
          this.open(result.uri);
        } catch (error) {
          console.error('Failed to save file:', error);
        }
      };
    });
}
async saveFileToDevice(fileData: string, fileName: string) {
  console.log(fileData);
  try {
    await this.platform.ready();

    const result = await Filesystem.writeFile({
      path: fileName,
      data: fileData,
      directory: Directory.Documents
    });

    console.log('File saved:', result.uri);

    // Now open the file
    this.open(result.uri);
  } catch (error) {
    console.error('Error saving file', error);
  }
}

async open(fileUrl: string = "") {
  this.loader.dismiss();
  try {
    let path = fileUrl;
    await this.fileOpener.open(path, this.getMimeType(path));
     console.log('File is opened');
  } catch (error) {
     console.error('Error opening file', error);
  }
}
getMimeType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image/jpeg';
    case 'mp4':
      return 'video/mp4';
    case 'doc':
    case 'docx':
      return 'application/msword';
    default:
      return 'application/octet-stream';
  }
}
getFileExtension(fileUrl: string): string {
  const fileParts = fileUrl.split('.');
  return fileParts.length > 1 ? `.${fileParts.pop()}` : '.bin'; 
}
generateUniqueFileName(baseName:any) {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); 
  return `${baseName}_${timestamp}`;
}
}
