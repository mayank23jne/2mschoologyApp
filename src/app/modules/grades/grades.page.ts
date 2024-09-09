import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  grades_data: any = [];
  formData: any;
  search: any;
  constructor(private fetch: SchoolDataService, private loader: LoaderService) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.formData = new FormData();
    this.list(this.formData);
  }
  list(formData: any) {
    this.loader.present();
    this.fetch.grades(formData).subscribe({
      next: (res: any) => {
        if (res) {
          this.loader.dismiss();
          this.grades_data = res.data;
        }
        else {
          this.grades_data = [];
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  searchRes() {
    this.formData.append('search_name', this.search);
    this.list(this.formData);
  }
  searchCancel() {
    this.search = "";
    this.searchRes();
  }

}
