import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { IHueLight, IPhilipsHueState, IHueGroup, IBridgeConfig, IHueResourceLink, IHueRule, IHueScene, IHueSchedule, IHueSensor } from 'src/model/philips-hue.model';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PhilipsHueService {
  endpoint: string = `${env.hue_hub.endpoint}/api`;
  connected: boolean = false;
  username: string = `${env.hue_hub.username}`;
  
  private _state: IPhilipsHueState = {
    lights: [],
    groups: [],
    resourcelinks: [],
    rules: [],
    scenes: [],
    schedules: [],
    sensors: []
  };
  get state():IPhilipsHueState {
      return this._state;
  }  

  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
      // "Content-Type": "application/json",
      // "Accept": "application/json"
    })
  };

  constructor(private _http: HttpClient, private notification: NotificationService) {
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
        })
  }

  // Request the latest bridge state from the hue bridge -> https://<bridge ip address>/api/<username>
  updateState() {
    console.info("[PH]Requesting bridge state")

    this._http.get(`${this.endpoint}/${this.username}`)
      .subscribe(x => {
        let response = x as { config, groups, lights, resourcelinks, rules, scenes, schedules, sensors }

        this._state.config = response.config as IBridgeConfig;
        Object.keys(response.groups).map(i => {this._state.groups.push(response.groups[i] as IHueGroup)})
        Object.keys(response.lights)
          .map(i => {
            let newLight:IHueLight = response.lights[i] as IHueLight
            newLight.id = i;
            this._state.lights.push(newLight)
          })
        Object.keys(response.resourcelinks).map(i => {this._state.resourcelinks.push(response.resourcelinks[i] as IHueResourceLink)})
        Object.keys(response.rules).map(i => {this._state.rules.push(response.rules[i] as IHueRule)})
        Object.keys(response.scenes).map(i =>{this._state.scenes.push(response.scenes[i] as IHueScene)})
        Object.keys(response.schedules).map(i =>{this._state.schedules.push(response.schedules[i] as IHueSchedule)})
        Object.keys(response.sensors).map(i =>{this._state.sensors.push(response.sensors[i] as IHueSensor)})
        this.notification.showSuccess("Philips Hue","connected successfully")

        console.log(response.lights);
      },
      err => {
        console.error(`[PH]Error requesting bridge state, ${err.error.data.message}`)
        this.notification.showError("[PH]Error requesting bridge state", err.error.data.message)
      })
  }

  //Turn light on/off
  toggleLightOnOff(l: IHueLight) {
    let body = {
      on: !l.state.on
    }
    switch(body.on)
    {
      case true:
        console.log(`Turning ${l.name} light on`)
        this.changeLightState(l.id,body)
        break;
      case false:
        console.log(`Turning ${l.name} light off`)
        this.changeLightState(l.id,body)
        break;
    }

    this.updateLight(l)
  }
  
  //Change light state
  changeLightState(ID: string, body: object) {
    console.log(`Changing light state of light ID: ${ID}`)

    this._http.put(`${this.endpoint}/${this.username}/lights/${ID}/state`, JSON.stringify(body), this.httpOptions)
      .subscribe(
        res => {
          console.log("Response")
          console.log(res)
        },
        err => {
          console.error(`[PH]Error updating light state, ${err.error.data.message}`)
          this.notification.showError("[PH]Error updating light state", err.error.data.message)
        }
      )
  }
    
  // Request a list of lights from hue bridge -> https://<bridge ip address>/api//<username>/lights
  updateLight(l: IHueLight) {
    console.info("[PH]Updating light state")

    this._http.get(`${this.endpoint}/${this.username}/lights/${l.id}`, this.httpOptions)
      .subscribe(
        res =>{
          let response  = res as IHueLight | { success: { [state:string]: boolean|string|number }}
          const index: number = this.state.lights.findIndex(lItem => {return lItem == l})
          
          let oldID = this.state.lights[index].id;
          this.state.lights[index] = response as IHueLight
          this.state.lights[index].id = oldID
        },
        err => {
          console.error(`[PH]Error requesting lights, ${err.error.data.message}`)
          this.notification.showError("Philips Hue", `Error requesting lights ${err.error.data.message}`)
        }
      )
  }

  // Request the latest bridge config from hue bridge -> https://<bridge ip address>/api/<username>/config
  // updateConfig() {
  //   console.info("[PH]Requesting bridge config")

  //   this._http.get(`${this.endpoint}/${this.username}/config`)
  //     .subscribe(
  //       res =>{
  //         this.state.config = res as IBridgeConfig
  //         this.notification.showSuccess('Philips Hue', "config updated")
  //       },
  //       err => {
  //         console.error(`[PH]Error requesting config, ${err.error.data.message}`)
  //         this.notification.showError("[PH]Error requesting config", err.error.data.message)
  //       }
  //     )
  // }
}