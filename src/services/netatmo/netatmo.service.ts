import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { map } from 'rxjs/operators';
import {RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NetatmoService {
  

  constructor(
    private _http: HttpClient,
    private notification: NotificationService
    ) {
      this.getAuthToken()
  }

  getAuthToken() {
    console.info("[NA]Connecting to Netatmo")
    
    var body = `grant_type=password&client_id=${env.netatmo.id}&client_secret=${env.netatmo.secret}&username=${env.email_address}&password=${env.netatmo.password}`;

    return this._http.post(`${env.netatmo.endpoint}/oauth2/token`, body, {
      headers: new HttpHeaders({
        Authorization: "Basic +token",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      })
    }).subscribe(
      res =>{
        let response = res as
        { 
          access_token: string,
          refresh_token: string,
          scope: string[],
          expires_in: number,
          expire_in: number
        }
        console.log(res)
      },
      err => {
        console.error(`[NA]Error linking netamtmo, ${err.message}`)
        this.notification.showError("[NA]Error linking netatmo", `${err.message}`)
      })
  }
}
