import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';

@Component({
  selector: 'app-class-filter',
  templateUrl: './class-filter.component.html',
  styleUrls: ['./class-filter.component.scss'],
})
export class ClassFilterComponent {

  classes: any = [];
  sections: any[]=[];
  sections_list:any;
  selectedClass: any;
  selectedSection: any;
  students:any;
  user_id: any;
  student_id:any;
  @Input() mode = 1;
  role:any;
  @Output() filterChange: EventEmitter<{ class: any, section: any,student_id:any}> = new EventEmitter();
  constructor(private fetch: SchoolDataService,private data:DataService,private cdr: ChangeDetectorRef) { }
  selectedStudentData:any;
  ngOnInit() {
    this.data.role$.subscribe(role => {
      this.role = role;
      this.cdr.detectChanges(); // Trigger change detection
    });

    this.fetch.classList().subscribe({
      next: (res: any) => {
        if (res.classes) {
          this.classes = res.classes;
          this.sections_list = res.section;
        }
        if (res.data) {
          this.students = res.data;
        }
      },
      error: (error: any) => {
      }
    });
  }
  onFilterChange() {
    this.sections =  this.sections_list.filter((item: { class_id: string; }) => item.class_id === this.selectedClass);
    this.selectedSection = this.sections[0].id;
    this.filterChange.emit({ class: this.selectedClass, section: this.sections[0].id ,student_id:""});
  }

  onFilterSectionChange() {
    this.filterChange.emit({ class: this.selectedClass, section: this.selectedSection,student_id:"" });
  }

  onFilterStudentChange() {
    this.selectedClass = this.selectedStudentData?.class_id;
    this.selectedSection = this.selectedStudentData?.section_id;
    this.student_id = this.selectedStudentData?.user_id;
 
    this.filterChange.emit({ class: this.selectedClass, section: this.selectedSection ,student_id:this.student_id});
  }

}
