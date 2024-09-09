import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SchoolDataService } from 'src/app/core/services/school-data.service';
import { ArrayType } from '@angular/compiler';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.page.html',
  styleUrls: ['./print-invoice.page.scss'],
})
export class PrintInvoicePage implements OnInit {

  heading_title: string = '';
  invoiceId: any;
  invoiceData: any = [];
  formData: any;
  apiIsLoaded: boolean = true;
  
  constructor(private http: HttpClient ,private toastService: ToastService,private modalController: ModalController, private navParams: NavParams,  private fetch: SchoolDataService, private loader: LoaderService, private platform: Platform) { }

  ngOnInit() {
    this.heading_title = this.navParams.get('title');
    this.invoiceId = this.navParams.get("invoice_id");
    this.formData = new FormData()
    this.formData.append('invoice_id', this.invoiceId);
    this.getInvoiceById();
   
  }

  downloadInvoice() {
    const element = document.getElementById('invoiceCard');

    if (element) {
      this.loader.present();
      element.style.width = '1100px';
      element.style.padding = '0 100px';
      html2canvas(element, {
        scale: 2, // Adjust the scale to a smaller value if needed
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG and lower quality
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Convert PDF to base64 string
        const pdfData = pdf.output('datauristring').split(',')[1];

        // Save the PDF to the device
        this.savePdfToDevice(pdfData, 'invoice.pdf');

        // element.style.display = 'none';
        this.loader.dismiss();
        this.toastService.presentToast('Invoice downloaded successfully');
      }).catch(error => {
        console.error('Error generating PDF:', error);
        this.loader.dismiss();
      });
      element.style.width = 'auto';
      element.style.padding = '0';
    } else {
      console.error('Element not found');
    }
  }

  async savePdfToDevice(pdfData: string, fileName: string) {
    await this.platform.ready();
    
    Filesystem.writeFile({
      path: fileName,
      data: pdfData,
      directory: Directory.Documents,
      recursive: true
    }).then(() => {
      console.log('PDF saved to Documents folder');
    }).catch((error) => {
      console.error('Error saving PDF:', error);
    });
  }
  downloadPdfFromLink(pdfUrl: string, fileName: string) {
  
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'https://2mschoology.com/uploads/syllabus/1658ed927ee9b345b93ac836538864eb.pdf';
  fetch(proxyUrl + targetUrl)
    .then(response => response.blob())
    .then(async (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64String = base64data.split(',')[1];

        await this.savePdfToDevice(base64String, fileName);
        this.toastService.presentToast('PDF downloaded successfully');
      };
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
      this.toastService.presentToast('Error downloading PDF');
    });

}

    getInvoiceById(){
        this.loader.present();
        this.fetch.studentFeeInvoice(this.formData).subscribe({
          next:(res:any) => {
            if (res.code == 200) {
              this.invoiceData = res.data;
            }
            else{
              this.invoiceData = [];
            }
            this.loader.dismiss();
            this.apiIsLoaded = true;
          },
          error: (error:any) => {
            this.loader.dismiss();
            this.apiIsLoaded = true;
          }
        });
      }


   closeModal() {
    this.modalController.dismiss();
  }

}
