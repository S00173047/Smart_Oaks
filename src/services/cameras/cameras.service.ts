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
  loginString: string = `?user=${env.zoneminder.username}&pass=${env.zoneminder.password}`

  loggedIn: boolean = false;

  authParam: string;
  authResponse;
  monitors: IMonitor[] = [];
  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
      "Content-Type": "text/plain;charset=UTF-8",
      "Accept": "application/json"
    })
  };


  constructor(private _http: HttpClient, private notification: NotificationService) { }

  //Login to the API
  login() {
     this._http.get(`${this.endpoint}/host/login.json${this.loginString}`, this.httpOptions)
         .subscribe(
           data => {
             let response = data as { apiVersion, append_password, credentials, version }

            //  document.cookie = `apiVersion=${response.apiVersion};append_password=${response.append_password};credentials=${response.credentials};;version=${response.version};secure`;

             this.authParam = response.credentials;
             if(response.credentials != null)
             {
               this.loggedIn = true;
               this.notification.showSuccess("Zoneminder logged in successfully");
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
    // return this._http.get(`${this.endpoint}/monitors.json${this.loginString}`, this.httpOptions)
    this._http.get(`${this.endpoint}/monitors.json${this.loginString}`, this.httpOptions)
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
    return this._http.get(`${this.endpoint}/monitors/${id}.json${this.loginString}`, this.httpOptions)
      .pipe(map(data => {
          let response = data as { monitor }
          return response.monitor;
        }))
  }

  //Get event based of its id -> Http://server/zm/api/events/1000.json
  public getEvent(id: string){
    console.info(`[ZM]Getting event ${id}`)
    return this._http.get(`${this.endpoint}/events/${id}.json${this.loginString}`, this.httpOptions)
      .pipe(map(data => {
          console.log(data)
          let response = data;
        }))
  }

  //Get events for a certain monitor -> http://server/zm/api/events/index/MonitorId:5.json
  public getEventsForMonitor(id: string): Observable<IEvent[]> {
    console.info(`[ZM]Getting events for monitor ${id}`);
    return this._http.get(`${this.endpoint}/events/index/MonitorId:${id}.json${this.loginString}`, this.httpOptions)
      .pipe(map(data => {
        let response = data as { events: IEvent[], pagination }
        return response.events
      }))
  }
}
