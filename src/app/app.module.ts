import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsPageModule } from './tabs/tabs.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './core/intercepter/auth.interceptor';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,TabsPageModule,HttpClientModule,CKEditorModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DatePipe,FileTransfer,InAppBrowser,AuthInterceptor,File,FileOpener
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
