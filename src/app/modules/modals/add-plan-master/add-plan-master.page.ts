import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-plan-master',
  templateUrl: './add-plan-master.page.html',
  styleUrls: ['./add-plan-master.page.scss'],
})
export class AddPlanMasterPage implements OnInit {

  heading_title: String = "";
  planForm!: FormGroup;
  addUserType: string = "";
  planId: any;
  planData: any;

  constructor(private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.planData = this.navParams.get('dataPlan');
    this.planId = this.planData?.id;
    this.planForm = this.fb.group({
      plan_name: ['', Validators.required],
      plan_type: ['', Validators.required],
      amount: ['', Validators.required],
      features: this.fb.array([this.createFeatureField()]),
      detail:[''],
      status: ['off'],
      plan_id:['']
    });

    if(this.planData){
      this.loadPlanData(this.planData);
    }

  }
  loadPlanData(planData: any) {
    // Set simple form controls
    this.planForm.patchValue({
      status: planData.status === '1' ? 'on' : 'off', 
      plan_name: planData.plan_name,
      plan_type: planData.plan_type,
      amount: planData.amount,
      detail: planData.detail,
      plan_id:this.planId
    });

    const featureList = planData.features.split(',');
    this.features.clear();

    featureList.forEach((feature: string) => {
      this.features.push(this.createFeatureField(feature.trim()));
    });
  }

  get features(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  createFeatureField(value: string = ''): FormControl<string | null> {
    return new FormControl<string | null>(value); 
  }
 
  addFeature() {
    this.features.push(this.createFeatureField());
  }

  removeFeature(index: number) {
    this.features.removeAt(index);
  }

  submit() {
    this.planForm.markAllAsTouched();
    // Convert features array to a comma-separated string
    const featuresArray = this.planForm.value.features;
    const formattedFeatures = featuresArray.join(', ');

    // Update the formData with the formatted features
    const formData = {
      ...this.planForm.value,
      features: formattedFeatures // Replace the features array with the formatted string
    };
    console.log(formData);
    this.loader.present();
    this.fetch.createPlanSettings(formData).subscribe({
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
