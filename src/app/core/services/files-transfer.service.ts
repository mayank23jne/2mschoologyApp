import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class FilesTransferService {

  constructor(private http: HttpClient, private fileOpener: FileOpener) {}

  async saveFile(fileBlob: Blob, fileName: string): Promise<string> {
    const base64Data = await this.convertBlobToBase64(fileBlob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    });
    return savedFile.uri;
  }

  convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async openFile(filePath: string, fileName: string) {
    try {
      const mimeType = this.getMimeType(fileName);
      if (!mimeType) {
        console.error('Could not determine MIME type for the file');
        return;
      }

      // Open the file
      await this.fileOpener.open(filePath, mimeType);
    } catch (error) {
      console.error('Failed to open file:', error);
    }
  }

  getMimeType(fileName: string): string | null {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'txt': 'text/plain',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
      // add other types as needed
    };
    return mimeTypes[extension || ''] || null;
  }

   // async downloadFile(url: string, fileName: string) {
  //   const notificationId = Math.floor(Date.now() / 1000);
  //   let filePath: string | null = null;
  //   let lastPercentReported = 0; // Track last percentage to reduce updates
   
  //   this.http.get(url, {
  //     responseType: 'blob',
  //     reportProgress: true,
  //     observe: 'events'
  //   }).subscribe(async (event) => {
  //     if (event.type === HttpEventType.DownloadProgress && event.total) {
  //       const percentDone = Math.min(100, Math.round((100 * event.loaded) / event.total));
  //       console.log(percentDone);
  //       if (percentDone >= lastPercentReported + 5) {
  //         lastPercentReported = percentDone;

  //         // Update the existing notification with the current progress
  //         await LocalNotifications.schedule({
  //           notifications: [
  //             {
  //               id: notificationId, // Use the same ID to update the notification
  //               title: 'Downloading...',
  //               body: `${percentDone}% completed`
  //             }
  //           ]
  //         });
  //       }
  //     } else if (event.type === HttpEventType.Response) {
  //       const fileBlob = event.body;
  //       if (fileBlob instanceof Blob) {
  //         filePath = await this.saveFile(fileBlob, fileName);

  //         await LocalNotifications.schedule({
  //           notifications: [
  //             {
  //               id: notificationId,
  //               title: 'Download Complete',
  //               body: `Tap to open`,
  //               actionTypeId: 'OPEN_FILE',
  //               extra: {
  //                 filePath: filePath,
  //                 fileName: fileName
  //               }
  //             }
  //           ]
  //         });
  //       } else {
  //         console.error('Download failed: fileBlob is null or invalid');
  //       }
  //     }
  //   });
  // }
}
