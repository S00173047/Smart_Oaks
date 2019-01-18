import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { ILight, IPhilipsHueState } from 'src/model/philips-hue.model';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PhilipsHueService {
  endpoint: string = `${env.hue_hub.endpoint}/api`;

  connected: boolean = false;
  username: string;
  
  state: IPhilipsHueState;

  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  };

  constructor(private _http: HttpClient, private notification: NotificationService) {
    this.username = env.hue_hub.username;
    this.state = {
      lights: []
    }
    this.getState();
  }

  //Request new username from hue hub
  connectToBridge() {
    console.info("[PH]Connecting to bridge")

    let body = {
      "devicetype": env.hue_hub.app_name
    }

    this._http.post(`${this.endpoint}`, body, this.httpOptions)
      .subscribe(
        res =>{
          let response = res[0] as { error?: { address, description, type }, success?: { username } }
          if(response.success != null)
          {
            env.hue_hub.username = response.success.username;
            this.connected = true;
            this.notification.showSuccess("[PH]Hue linked successfully",`username: ${response.success.username}`)
          }
          else if(response.error != null)
          { this.notification.showError("[PH]Hue failed to link",`${response.error.type}: ${response.error.description}`) }
        },
        err => {
          console.error(`[PH]Error linking hub, ${err.error.data.message}`)
          this.notification.showError("[PH]Error linking hub", err.error.data.message)
        }
      )
  }

  getState() {
    console.info("[PH]Requesting bridge state")

    this._http.get(`${this.endpoint}/${this.username}`)
      .subscribe(x => {
        let response = x as { config, groups, lights, resourcelinks, rules, scenes, schedules, sensors }
        Object.keys(response.lights).map(i => {this.state.lights.push(response.lights[i] as ILight)})
        this.notification.showSuccess("Philips Hue","connected successfully")
      }),
      err => {
        console.error(`[PH]Error requesting bridge state, ${err.error.data.message}`)
        this.notification.showError("[PH]Error requesting bridge state", err.error.data.message)
      }
  }

  updateConfig() {
    console.info("[PH]Requesting bridge config")

    this._http.get(`${this.endpoint}/${this.username}/config`)
      .subscribe(
        res =>{
          this.state.config = res
          this.notification.showSuccess('Philips Hue', "config updated")
        },
        err => {
          console.error(`[PH]Error requesting config, ${err.error.data.message}`)
          this.notification.showError("[PH]Error requesting config", err.error.data.message)
        }
      )
  }

  // Request a list of lights from hue hub -> https://<bridge ip address>/api/1028d66426293e821ecfd9ef1a0731df/lights
  updateLights() {
    console.info("[PH]Requesting all lights")

    this._http.get(`${this.endpoint}/${this.username}/lights`, this.httpOptions)
      .subscribe(
        res =>{
          let response = res;
          this.state.lights = response as ILight[]
          this.notification.showSuccess("Philips Hue", "lights updated")
        },
        err => {
          console.error(`[PH]Error requesting lights, ${err.error.data.message}`)
          this.notification.showError("Philips Hue", `Error requesting lights ${err.error.data.message}`)
        }
      )
  }
}