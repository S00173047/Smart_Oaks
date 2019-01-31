import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { map } from 'rxjs/operators';
import {RequestOptions} from '@angular/http';
import { INAWeatherStation, INAThermostat } from 'src/model/netatmo.model';
import { interval, Subscription } from 'rxjs';

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

  state: {
    weatherStations: INAWeatherStation
  }
  

  constructor(
    private _http: HttpClient,
    private notification: NotificationService
    ) {
  }

  //Auto-Refreshing
  sub: Subscription;
  startTokenRefreshing() {
    if(!this.token) {
      this.getAuthToken().subscribe(()=> {this.startTokenRefreshing()});
    }
    else {
      this.sub = interval((this.token.expires_in - 2) * 1000).subscribe(x => { this.getAuthToken().subscribe() } )
    }
  }

  stopTokenRefreshing() {
    this.sub.unsubscribe()
  }

  private getAuthToken() {
    console.info('%c[NA]','color: orange',`Getting auth token`)
    
    var body = 
    `grant_type=password&client_id=${env.netatmo.id}`+
    `&client_secret=${env.netatmo.secret}`+
    `&username=${env.email_address}`+
    `&password=${env.netatmo.password}`+
    `&scope=read_station read_thermostat write_thermostat read_presence`;

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
        console.info('%c[NA]','color: orange',`Auth token received. Expires in ${this.token.expires_in/60/60} hours`)
      },
      err => {
        console.error('%c[NA]','color: orange',`Error linking netamtmo ${err.status}, ${err.message}`)
        this.notification.showError("[NA]Error linking netatmo", `${err.message}`)
    }));
  }

  //Get local weather stations
  GetWeatherStations() {
    console.info('%c[NA]','color: orange',`Getting weather station data`)

    var params = 
      `access_token=${this.token.access_token}` +
      `&filter=true` +
      `&lat_sw=53.763359&lon_sw=-8.765153` +
      `&lat_ne=53.943562&lon_ne=-8.095400`;

    return this._http.get(`${env.netatmo.endpoint}/api/getpublicdata?${params}`)
    .subscribe(
      res =>{
        let response = res as {
          body: INAWeatherStation[];
          status: string
        }

        console.info('%c[NA]','color: orange',`Weather station data received`)
        this.notification.showSuccess("[NA]Weather station data received")
        console.log(response);
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting weather station data, ${err.message}`)
        this.notification.showError("[NA]Error getting weather station data", `${err.message}`)
      })
  }
  
  //Get local weather stations
  GetThermostats() {
    console.info('%c[NA]','color: orange',`Getting thermostats data`)

    var params = 
      `access_token=${this.token.access_token}`

    return this._http.get(`${env.netatmo.endpoint}/api/getthermostatsdata?${params}`)
    .pipe(map(
      res =>{
        let response = res as {
          body: {
            devices: INAThermostat[]
          };
          status: string
          time_exec: number
          time_server: number
        }
        console.info('%c[NA]','color: orange',`Thermostats data received`)
        this.notification.showSuccess("[NA]Thermostats data received")
        console.log(response);
        return response.body.devices;
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting thermostats data, ${err.message}`)
        this.notification.showError("[NA]Error getting thermostats data", `${err.message}`)
      }))
  }
}
