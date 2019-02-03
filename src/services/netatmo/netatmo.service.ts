import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { map } from 'rxjs/operators';
import {RequestOptions} from '@angular/http';
import { INAWeatherStation, INAHome } from 'src/model/netatmo.model';
import { interval, Subscription, Observable } from 'rxjs';

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
    weatherStations?: INAWeatherStation[]
    homes?: INAHome[]
  } = {};
  

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

      this.GetWeatherStations().subscribe(x => this.state.weatherStations = x)
      this.GetHomesData().subscribe(x => this.state.homes = x)
    }
  }

  stopTokenRefreshing() {
    this.sub.unsubscribe()
  }

  private getAuthToken() {    
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
  GetWeatherStations(): Observable<INAWeatherStation[]> {
    var params = 
      `&filter=true` +
      `&lat_sw=53.763359&lon_sw=-8.765153` +
      `&lat_ne=53.943562&lon_ne=-8.095400`;

    return this._http.get(`${env.netatmo.endpoint}/api/getpublicdata?${params}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.access_token}`
      })
    })
    .pipe(map(
      res =>{
        let response = res as {
          body: INAWeatherStation[];
          status: string
        }
        console.info('%c[NA]','color: orange',`Weather station data received`)
        this.notification.showSuccess("[NA]Weather station data received")
        return response.body
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting weather station data, ${err.message}`)
        this.notification.showError("[NA]Error getting weather station data", `${err.message}`)
      }))
  }
  
  //Get homes data
  GetHomesData(): Observable<INAHome[]> {
    console.info('%c[NA]','color: orange',`Getting home data`)
    
    return this._http.get(`${env.netatmo.endpoint}/api/homesdata?`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.access_token}`
      })
    })
    .pipe(map(
      res => {
        let response = res as {
          body: {
            homes: INAHome[]
            user: {
              id: string
            }
          }
          status: string
          time_exec: number
          time_server: number
        }
        console.info('%c[NA]','color: orange',`Home data received`)
        this.notification.showSuccess("[NA]Home data received")
        return response.body.homes;
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting Home data, ${err.message}`)
        this.notification.showError("[NA]Error getting Home data", `${err.message}`)
      }))
  }

  //Get homes data
  GetHomeStatus(id: string): Observable<INAHome> {
    console.info('%c[NA]','color: orange',`Getting home status`)

    var params = `home_id=${id}`

    return this._http.get(`${env.netatmo.endpoint}/api/homestatus?${params}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token.access_token}`
      })
    })
    .pipe(map(
      res => {
        let response = res as {
          body: {
            home: INAHome
            user: {
              id: string
            }
          }
          status: string
          time_exec: number
          time_server: number
        }
        return response.body.home;
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting Home status, ${err.message}`)
        this.notification.showError("[NA]Error getting Home status", `${err.message}`)
      }))
  }

  //Set room therm point https://api.netatmo.com/api/setroomthermpoint
  SetRoomThermPoint(home_id: string, room_id: string, temp: number, endtime: number) {
    console.info('%c[NA]','color: orange',`setting temp to ${temp}`)

    var params = `home_id=${home_id}&room_id=${room_id}&temp=${temp}&mode=manual`
    // &endtime=${endtime}&mode=manual`

    this._http.get(`${env.netatmo.endpoint}/api/setroomthermpoint?${params}`, {
      headers: new HttpHeaders({ 
        Authorization: `Bearer ${this.token.access_token}`
      })
    })
    .subscribe(
      res => {
        let response
        console.log(response)
      },
      err => {
        console.error('%c[NA]','color: orange',`Error getting Home status, ${err.message}`)
        this.notification.showError("[NA]Error getting Home status", `${err.message}`)
      })
  }
}
