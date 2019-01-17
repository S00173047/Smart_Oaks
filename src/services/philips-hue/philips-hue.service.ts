import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PhilipsHueService {
  endpoint: string = `${env.hue_hub.endpoint}/api`;

  connected: boolean = false;
  username: string;

  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  };

  constructor(private _http: HttpClient, private notification: NotificationService) {
    this.username = env.hue_hub.username;
  }

  //Request new username from hue hub
  connectToBridge() {
    console.log("Connecting to bridge")

    let body = {
      "devicetype": env.hue_hub.app_name
    }

    this._http.post(`${this.endpoint}`, body, this.httpOptions)
      .subscribe(
        res =>{
          let response = res[0] as { error?: { address, description, type }, success?: { username } }
          if(response.success != null)
          {
            this.username = response.success.username;
            this.connected = true;
            this.notification.showSuccess("Hue linked successfully",`username: ${response.success.username}`)
          }
          else if(response.error != null)
          { this.notification.showError("Hue failed to link",`${response.error.type}: ${response.error.description}`) }
        },
        err => {
          console.error(`Error linking hub, ${err.error.data.message}`)
          this.notification.showError("Error linking hub", err.error.data.message)
        }
      )
  }

  //Request a list of lights from hue hub -> https://<bridge ip address>/api/1028d66426293e821ecfd9ef1a0731df/lights
  getAllLights() {
    console.log("Getting lights")

    this._http.get(`${this.endpoint}/${this.username}/lights`, this.httpOptions)
      .subscribe(
        res =>{
          let response = res;
          console.log(response);
        },
        err => {
          console.error(`Error getting lights, ${err.error.data.message}`)
          this.notification.showError("Error getting lights", err.error.data.message)
        }
      )
  }
}