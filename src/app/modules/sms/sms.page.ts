import { Component, OnInit, signal } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {
  message: string = '';
  allChecked: boolean = false;
  receiver: Array<{ key: string; value: string }> = [];
  items: any = [];
  class: any=[];
  selectedData: any=[];
  disableDropdown: boolean = false;
  section: any = [];
  checkedAll: boolean = false;
  signalCol: boolean = false;
  colTitle: string = "";
  

  constructor(
    private api: SchoolDataService,
    private loader: LoaderService,
    private toastService: ToastService,
  ) {
    this.receiver = [
      { key: "bulk", value: "ALL STAFF MEMBERS" },
      { key: "student", value: "Student" },
      { key: "allstudent", value: "All Student" },
      { key: "parent", value: "Parent" },
      { key: "allparent", value: "All Parent" },
      { key: "teacher", value: "Teacher" },
      { key: "allteacher", value: "All Teacher" }
    ];
  }
  ngOnInit() {
    this.getClass();
  }
  getClass() {
     this.loader.present();
     this.class = this.api.classList().subscribe({
      next:(res:any) => {
      if(res.code == 200){
        this.class = res;
        console.log(this.class);
        
        }
        else{
          this.class = "";
        }
        this.loader.dismiss();
      },
      error: (error:any) => {
        this.loader.dismiss();
      }
    });
  }
  selectedReceiver() {
    const receiver = this.selectedData.receiver;
    this.disableDropdown = !(receiver === 'parent' || receiver === 'student');
    const signalReceivers = ['teacher', 'allstudent', 'teacher', 'allteacher'];
    this.signalCol = signalReceivers.includes(receiver);
  }

  selectedClass() {
    const classID = this.selectedData.class;
    const sectionData = this.class.section.filter((data: any) => data.class_id == classID);
    this.section = sectionData;    
  }
 showReceivers() {
   const data = new FormData();
   data.append('receiver', this.selectedData.receiver);
   data.append('class_id', this.selectedData.class||"");
   data.append('section_id', this.selectedData.section_id||"");
   const selectedReceiver = this.receiver.find((r: any) => r.key === this.selectedData.receiver);
   this.colTitle = selectedReceiver ? selectedReceiver.value : 'Unknown Receiver';
   this.loader.present();  
   this.api.smsList(data).subscribe({
    next: (res: any) => {
      if (res && res.code === 200) {    
        this.items = (res.data.students || res.data || []).map((item: any) => {
          return {
            ...item,
            checked: false
          };
        });
      } else {
        this.items = []; 
        console.log('Invalid response code:', res);
       }
       this.loader.dismiss();
    },
    error: (error: any) => {
      console.error('API call failed:', error);
      this.items = []; 
      this.loader.dismiss();
    }
  });
}
 sendSMS() {
   const data = new FormData();
   data.append('phones', this.getSelectedItems());
   data.append('messages', this.selectedData.message || "");
   this.loader.present();  
   this.api.sendMessage(data).subscribe({
    next: (res: any) => {
      if (res && res.code === 200) {    
       this.toastService.presentToast(res.response);
      } else {
        this.toastService.presentErrorToast(res.response);
      }
      this.loader.dismiss();
    },
    error: (error: any) => {
      console.error('API call failed:', error);
      this.loader.dismiss();
    }
  });
}

  async toggleAll() {
    await  this.items.forEach((item:any) => {
        item.checked = this.allChecked;
    });
    console.log(this.getSelectedItems());
    }
  checkIfAllSelected() {
    this.allChecked = this.items.every((item: any) => item.checked);
     console.log(this.getSelectedItems());
  }
  getSelectedItems() {
    const selectedItems = this.items.filter((item:any) => item.checked);
    console.log('Selected Items:', selectedItems);
    const selectedValues = selectedItems.map((item:any) => item.parent_phone);
    console.log('Selected Values (parent_phone):', selectedValues);
    
    return selectedItems; 
  }

}
