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
  authParam: string;

  loggedIn: boolean = false;

  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
      // "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type":"multipart/form-data",
      // "Content-Type": "application/json",  //Doesn't Accept
      "Content-Type": "text/plain;charset=UTF-8",
      "Accept": "application/json"
    })
  };

  authResponse;

  constructor(private _http: HttpClient, private notification: NotificationService) { }

  //Login to the API
  login() {
     this._http.get(`${this.endpoint}/host/login.json${this.loginString}`, this.httpOptions)
         .subscribe(
           data => {
             let response = data as { apiVersion, append_password, credentials, version }
             this.authParam = response.credentials;
             this.authResponse = response;
             if(response.credentials)
             {
               this.loggedIn = true;
               this.notification.showSuccess("Zoneminder logged in successfully");
              }
           },
           err => {
             console.error(`Error during Zoneminder login, ${err.error.data.message}`)
             this.notification.showError("Error during Zoneminder login", err.error.data.message)
           }
         )
  }
  // Get A list of monitors
  getMonitors(): Observable<IMonitor[]> {
    return this._http.get(`${this.endpoint}/monitors.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { monitors }
        return response.monitors as IMonitor[];
      })
    );
  }

  //Get a monitor based off its id -> Http://server/zm/api/monitors/1.json
  public getCamera(camera: string): Observable<IMonitor> {
    return this._http.get(`${this.endpoint}/monitors/${camera}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { monitor }
        return response.monitor as IMonitor;
      })
    );
  }

  //Get event based of its id -> Http://server/zm/api/events/1000.json
  public getEvent(event: string) {
    return this._http.get(`${this.endpoint}/events/${event}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        console.log(res);
        return res;
      })
    );    
  }

  //Get events for a certain monitor -> http://server/zm/api/events/index/MonitorId:5.json
  public getEventsForMonitor(monitor: string) {
    return this._http.get(`${this.endpoint}/events/index/MonitorId:${monitor}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { events: IEvent[], pagination }
        return response.events;
      })
    );
  }
}
