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

  //Get light by ID on bridge
  getLightIndexById(id: string): number {
    return this.state.lights.findIndex(lItem => {return lItem.id == id})
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
          console.error(`[PH]Error linking hub, ${err}`)
          this.notification.showError("[PH]Error linking hub", `${err}`)
        })
  }

  // Request the latest bridge state from the hue bridge -> https://<bridge ip address>/api/<username>
  updateState() {
    console.info("[PH]Requesting bridge state")

    this._http.get(`${this.endpoint}/${this.username}`)
      .subscribe(x => {
        let response = x as { config, groups, lights, resourcelinks, rules, scenes, schedules, sensors }

        this._state.config = response.config as IBridgeConfig;
        Object.keys(response.groups)
          .map(i => {
            let newGroup = response.groups[i] as IHueGroup
            newGroup.id = i
            if(newGroup.type != "Entertainment")
            { this._state.groups.push(newGroup) }
          })
        Object.keys(response.lights)
          .map(i => {
            let newLight = response.lights[i] as IHueLight
            newLight.id = i
            this._state.lights.push(newLight)
          })
        Object.keys(response.resourcelinks)
          .map(i => {
            let newResource = response.resourcelinks[i] as IHueResourceLink
            newResource.id = i
            this._state.resourcelinks.push(newResource)
          })
        Object.keys(response.rules)
          .map(i => {
            let newRule = response.rules[i] as IHueRule
            newRule.id = i
            this._state.rules.push(newRule)
          })
        Object.keys(response.scenes)
          .map(i =>{
            let newScene = response.scenes[i] as IHueScene
            newScene.id = i
            this._state.scenes.push(newScene)
          })
        Object.keys(response.schedules)
          .map(i =>{
            let newSchedule = response.schedules[i] as IHueSchedule
            newSchedule.id = i
            this._state.schedules.push(newSchedule)
          })
        Object.keys(response.sensors)
          .map(i =>{
            let newSensor = response.sensors[i] as IHueSensor
            newSensor.id = i
            this._state.sensors.push(newSensor)
          })

        this.notification.showSuccess("Philips Hue","connected successfully")
      },
      err => {
        console.error(`[PH]Error linking hub, ${err}`)
        this.notification.showError("[PH]Error linking hub", `${err}`)
      })
  }
  
  //Change light state
  private changeLightState(ID: string, body: object) {
    console.log(`Changing light state of light ID: ${ID}`)

    this._http.put(`${this.endpoint}/${this.username}/lights/${ID}/state`, JSON.stringify(body), this.httpOptions)
      .subscribe(
        res => {
          //No action on success yet
        },
        err => {
          console.error(`[PH]Error setting light state, ${err}`)
          this.notification.showError("[PH]Error setting light state", `${err}`)
        }
      )
  }
    
  // Request a list of lights from hue bridge -> https://<bridge ip address>/api//<username>/lights
  private updateLight(l: IHueLight) {
    console.info("[PH]Updating light state")

    this._http.get(`${this.endpoint}/${this.username}/lights/${l.id}`, this.httpOptions)
      .subscribe(
        res =>{
          let response  = res as IHueLight | { success: { [state:string]: boolean|string|number }}
          const index: number = this.state.lights.findIndex(lItem => {return lItem == l})
          
          let oldID = this.state.lights[index].id
          this.state.lights[index] = response as IHueLight
          this.state.lights[index].id = oldID
        },
        err => {
          console.error(`[PH]Error requesting light state, ${err}`)
          this.notification.showError("[PH]Error requesting light state", `${err}`)
        }
      )
  }

  // Request the latest bridge config from hue bridge -> https://<bridge ip address>/api/<username>/config
  private updateConfig() {
    console.info("[PH]Requesting bridge config")

    this._http.get(`${this.endpoint}/${this.username}/config`)
      .subscribe(
        res =>{
          this.state.config = res as IBridgeConfig
          this.notification.showSuccess('Philips Hue', "config updated")
        },
        err => {
         console.error(`[PH]Error requesting config, ${err}`)
         this.notification.showError("[PH]Error requesting config", `${err}`)
        }
      )
  }
}