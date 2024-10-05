import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.page.html',
  styleUrls: ['./payment-settings.page.scss'],
})
export class PaymentSettingsPage implements OnInit {
  currencyForm!: FormGroup;
  paypalForm!: FormGroup;
  stripeForm!: FormGroup;
  currencyPositionData: any;
  paymentSettingForm: any;
  paymentSettingData: any;
  paymentData: any;
  currencyData: any;
  stripeData: any;

  constructor(private data: DataService, private toastService: ToastService, private loader: LoaderService, private fetch: SchoolDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.currencyForm = this.fb.group({
      system_currency: [''],
      currency_position: [''],
      type: ['']
    });
    this.paypalForm = this.fb.group({
      paypal_active: ['no'],
      paypal_currency: [''],
      paypal_mode: ['sandbox',],
      paypal_client_id_sandbox: [''],
      paypal_client_id_production: [''],
      type: ['']
    });
    this.stripeForm = this.fb.group({
      stripe_active: ['no'],
      stripe_currency: [''],
      stripe_mode: ['on'],
      stripe_test_secret_key: [''],
      stripe_test_public_key: [''],
      stripe_live_secret_key: [''],
      stripe_live_public_key: [''],
      type: ['']
    });
    this.getCurrencySetting();
    this.getPaymentSetting();
    this.getStripeSetting();
  }

  getCurrencySetting() {
    const formData = new FormData();
    formData.append('type', 'system_currency');
    this.fetch.getPaymentSettings(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.currencyData = res?.data?.system_currency;
          this.currencyPositionData = res?.data?.currency_position;
          this.currencyForm.patchValue({
            system_currency: res?.data?.selected_system_currency,
            currency_position: res?.data?.selected_currency_position
          });
          
        }
        else {
          this.currencyData = [];
        }
      },
      error: (error: any) => {
      }
    });
  }
  getPaymentSetting() {
    const formData = new FormData();
    formData.append('type', 'payment_setting');
    this.fetch.getPaymentSettings(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.paymentData = res?.data;
          //console.log(this.paymentData);
          this.paypalForm.patchValue({
            paypal_active:res?.data?.selected_paypal_active,
            paypal_currency:res?.data?.selected_currency,
            paypal_mode:res?.data?.selected_mode,
            paypal_client_id_sandbox:res?.data?.selected_client_id_sandbox,
            paypal_client_id_production: res?.data?.selected_client_id_production
          });
        }
        else {
          this.paymentData = [];
        }
      },
      error: (error: any) => {
      }
    });
  }
  getStripeSetting() {
    const formData = new FormData();
    formData.append('type', 'stripe_settings');
    this.fetch.getPaymentSettings(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.stripeData = res?.data;
          this.stripeForm.patchValue({
            stripe_active: res?.data?.selected_paypal_stripe_active,
            stripe_currency: res?.data?.selected_stripe_currency,
            stripe_mode: res?.data?.selected_stripe_mode,
            stripe_test_secret_key: res?.data?.selected_stripe_test_secret_key,
            stripe_test_public_key: res?.data?.selected_stripe_test_public_key,
            stripe_live_secret_key: res?.data?.selected_stripe_live_secret_key,
            stripe_live_public_key: res?.data?.selected_stripe_live_public_key
          });
          // console.log(this.stripeData);
        }
        else {
          this.stripeData = [];
        }
      },
      error: (error: any) => {

      }
    });
  }
  updatePaymentSetting(type: any = "") {
    let formData;
    if (type == 'system_currency') {
      // console.log(type);
      this.currencyForm.patchValue({
        type: type
      });
      formData = this.currencyForm.value;
    }
    if (type == 'payment_setting') {
      // console.log(type);
      this.paypalForm.patchValue({
        type: type
      });
      formData = this.paypalForm.value;
    }
    if (type == 'stripe_settings') {
      // console.log(type);
      
      this.stripeForm.patchValue({
        type: type
      });
      formData = this.stripeForm.value;
    }
    this.fetch.updatePaymentSettings(formData).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.toastService.presentToast(res.response);
        }
        else {

        }
      },
      error: (error: any) => {

      }
    });


  }

}
