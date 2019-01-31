import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { IMonitor, IEvent } from 'src/model/cameras.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {
  endpoint: string = `${env.zoneminder.endpoint}/zm/api`;
  credentials: string = '';

  loggedIn: boolean = false;

  authParam: string;
  authResponse;
  monitors: IMonitor[] = [];

  constructor(private _http: HttpClient, private notification: NotificationService) { }

  //Login to the API
  login() {
    let body = `user=${env.zoneminder.username}&pass=${env.zoneminder.password}`

    this._http.post(`${this.endpoint}/host/login.json`, body, { headers:
      new HttpHeaders({
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      })})
      .subscribe(
        data => {
          let response = data as { apiVersion, append_password, credentials, version }

          this.authParam = response.credentials;
          if(response.credentials != null)
          {
            this.loggedIn = true;
            this.credentials = response.credentials;
            console.log("[ZM]Logged in successfully")
            this.notification.showSuccess("[ZM]Logged in successfully");
          }
        },
        err => {
          console.error(`[ZM]Error during login, ${err.error.data.message}`)
          this.notification.showError("[ZM]Error during login", err.error.data.message)
        }
      )
  }
  // Get A list of monitors
  getMonitors() {
    console.info("[ZM]Getting all monitors")
    console.log(this.credentials)
    this._http.get(`${this.endpoint}/monitors.json?${this.credentials}`)
      .subscribe(
        data => {
          let response = data as { monitors }
          this.monitors =  response.monitors as IMonitor[]
        },
        err => {
          console.error(`[ZM]Error getting monitors, ${err.error.data.message}`)
          this.notification.showError("[ZM]Error getting monitors", err.error.data.message)
      })
  }

  //Get a monitor based off its id -> Http://server/zm/api/monitors/1.json
  public getCamera(id: string) {
    console.info(`[ZM]Getting camera ${id}`)
    return this._http.get(`${this.endpoint}/monitors/${id}.json?${this.credentials}`)
      .pipe(map(data => {
          let response = data as { monitor }
          return response.monitor;
        }))
  }

  //Get event based of its id -> Http://server/zm/api/events/1000.json
  public getEvent(id: string){
    console.info(`[ZM]Getting event ${id}`)
    return this._http.get(`${this.endpoint}/events/${id}.json?${this.credentials}`)
      .pipe(map(data => {
          console.log(data)
          let response = data;
        }))
  }

  //Get events for a certain monitor -> http://server/zm/api/events/index/MonitorId:5.json
  public getEventsForMonitor(id: string): Observable<IEvent[]> {
    console.info(`[ZM]Getting events for monitor ${id}`);
    return this._http.get(`${this.endpoint}/events/index/MonitorId:${id}.json?${this.credentials}`)
      .pipe(map(data => {
        let response = data as { events: IEvent[], pagination }
        return response.events
      }))
  }
}
