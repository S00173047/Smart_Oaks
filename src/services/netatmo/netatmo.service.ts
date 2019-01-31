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
  
  token: {
    access_token: string,
    refresh_token: string,
    scope: string[],
    expires_in: number,
    expire_in: number
  }
  

  constructor(
    private _http: HttpClient,
    private notification: NotificationService
    ) {
      // this.getAuthToken().subscribe(res => {
      //   setTimeout(() => {
      //     console.info('refreshing token');
      //   }, this.token.expires_in);
      // })
      this.getAuthToken().subscribe();
  }

  getAuthToken() {
    console.info("[NA]Connecting to Netatmo")
    
    var body = `grant_type=password&client_id=${env.netatmo.id}&client_secret=${env.netatmo.secret}&username=${env.email_address}&password=${env.netatmo.password}`;

    return this._http.post(`${env.netatmo.endpoint}/oauth2/token`, body, {
      headers: new HttpHeaders({
        Authorization: "Basic +token",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      })
    }).pipe(map(
      res =>{
        this.token = res as {
          access_token: string,
          refresh_token: string,
          scope: string[],
          expires_in: number,
          expire_in: number
        }
        
        this.GetPublicData();
        // console.log(this.token);
      },
      err => {
        console.error(`[NA]Error linking netamtmo ${err.status}, ${err.message}`)
        this.notification.showError("[NA]Error linking netatmo", `${err.message}`)
    }));
  }
  GetPublicData() {
    console.info("[NA]Connecting to Netatmo")

    let myCoords = {
      longitude: 53.869483,
      latitude: -8.407222
    }
    var params = 
      `access_token=${this.token.access_token}`+
      `&lat_ne=${myCoords.latitude + 1}` + `&lon_ne=${myCoords.longitude + 1}` +
      `&lat_sw=${myCoords.latitude - 1}` + `&lon_sw=-${myCoords.longitude - 1}`;

    return this._http.get(`${env.netatmo.endpoint}/api/getpublicdata?${params}`)
    .subscribe(
      res =>{
        let response = res as {
          body: {
            mark: number,
            measures: Object,
            place: {

            }
          }[],
          status: string
        }

        console.log(response);
      },
      err => {
        console.error(`[NA]Error in netamtmo, ${err.message}`)
        this.notification.showError("[NA]Error in netatmo", `${err.message}`)
      })
  }
}
