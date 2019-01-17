import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { IMonitor, IEvent } from 'src/model/cameras.model';

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

  constructor(private _http: HttpClient) {
    this.login();
  }

  //Login to the API
  async login() {
    this._http.get(`${this.endpoint}/host/login.json${this.loginString}`, this.httpOptions)
      .subscribe(res => {
        let response = res as { apiVersion, append_password, credentials, version }
        this.authParam = response.credentials;
        this.authResponse = response;
        this.loggedIn = true;
      },
      catchError(this.handleError)
    )
  }
  // Get A list of monitors
  getMonitors(): Observable<IMonitor[]> {
    return this._http.get(`${this.endpoint}/monitors.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { monitors }
        return response.monitors as IMonitor[];
      }),
      catchError(this.handleError)
    );
  }

  //Get a monitor based off its id -> Http://server/zm/api/monitors/1.json
  public getCamera(camera: string): Observable<IMonitor> {
    return this._http.get(`${this.endpoint}/monitors/${camera}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { monitor }
        return response.monitor as IMonitor;
      }),
      catchError(this.handleError)
    );
  }

  //Get event based of its id -> Http://server/zm/api/events/1000.json
  public getEvent(event: string) {
    return this._http.get(`${this.endpoint}/events/${event}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );    
  }

  //Get events for a certain monitor -> http://server/zm/api/events/index/MonitorId:5.json
  public getEventsForMonitor(monitor: string) {
    return this._http.get(`${this.endpoint}/events/index/MonitorId:${monitor}.json${this.loginString}`, this.httpOptions)
      .pipe(map(res => {
        let response = res as { events: IEvent[], pagination }
        return response.events;
      }),
      catchError(this.handleError)
    );
  }
  //Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
    }
    return throwError(error);
  }
}
