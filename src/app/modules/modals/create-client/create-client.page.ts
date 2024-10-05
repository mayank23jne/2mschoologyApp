import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  heading_title: any;
  clientForm!: FormGroup;
  addClienttype!:string;
  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {

    this.heading_title = this.navParams.get('title');
    this.addClienttype = this.navParams.get('type');

    this.clientForm = this.fb.group({
      type: [''],
      name: ['', Validators.required],
      email: [''],
      website_url:[''],
      phone: [''],
      address: [''],
      id:['']
    });
  }
  submit(){
    this.clientForm.markAllAsTouched();
    const formData = new FormData();
    this.fetch.addclientFrom(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
          this.modalController.dismiss();
          this.loader.dismiss();
        } else {
          this.toastService.presentErrorToast(res.response);
        }
        this.loader.dismiss();
      },
      error: (error: any) => {
        this.loader.dismiss();
      }
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
