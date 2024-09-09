import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {
  user_id: any;
  exam_data: any;
  formData: any;
  search: any;

  constructor(private fetch: SchoolDataService, private loader: LoaderService, private data: DataService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.user_id = localStorage.getItem("userId");
    this.formData = new FormData();
    this.formData.append('user_id', this.user_id);
    this.loader.present();
    this.list();

  }

  list(formData: any = "") {
    this.fetch.examData(formData = "").subscribe({
      next: (res: any) => {
        this.loader.dismiss();
        if (res) {
          this.exam_data = res.data;
          this.exam_data.forEach((element: any, index: any) => {

            element.starting_date = this.data.formatDate(element.starting_date);
            element.ending_date = this.data.formatDate(element.ending_date);
          });
        }
        else {
          this.exam_data = "";
        }

      },
      error: (error: any) => {

      }
    });
  }
  searchRes() {

    this.exam_data.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.search.toLowerCase()));

  }

  searchCancel() {
    this.search = "";
    this.list();
  }
}
