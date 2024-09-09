import { Injectable } from '@angular/core';
import { HttpOptions } from '@capacitor/core';


@Injectable()
export class AuthInterceptor {
  constructor() {}

  interceptRequest(options: HttpOptions): HttpOptions {
    const authToken = localStorage.getItem('authToken');
    const headers:any = {
      ...options.headers,
      'Content-Type': 'application/json'
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return {
      ...options,
      headers: headers
    };
  }
}