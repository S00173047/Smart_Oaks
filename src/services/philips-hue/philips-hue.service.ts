import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { IHueLight, IPhilipsHueState, IHueGroup, IBridgeConfig, IHueResourceLink, IHueRule, IHueScene, IHueSchedule, IHueSensor } from 'src/model/philips-hue.model';

@Injectable({
  providedIn: 'root'
})
export class PhilipsHueService {
  endpoint: string = `${env.hue_hub.endpoint}/api`;
  username: string = `${env.hue_hub.username}`;

  stateUpdating: boolean = false;
  refreshRate: number = 60000;
  
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
  
  //Auto-Refreshing
  sub: Subscription;
  startRefreshing() { this.sub = interval(this.refreshRate).subscribe(x => { this.updateState() })}
  stopRefreshing() { this.sub.unsubscribe() }

  //Get light index by ID on bridge
  getLightIndexById(id: string): number { return this.state.lights.findIndex(lItem => {return lItem.id == id}) }
  
  //Get group index by name on bridge
  getGroupIndexByName(name: string) { return this.state.groups.findIndex(g => {return g.name == name}) }

  //Turn light on/off
  toggleLightOnOff(l: IHueLight) {
    let body = {on: !l.state.on}
    console.info(`Turning ${l.name} ${(body.on)?('on'):('off')}`)
    this.changeLightState(l.id,body)
  }

  //Toggle group on/off
  toggleGroupOnOff(g: IHueGroup) {
    let body = {on:!g.state.all_on}
    console.info(`Turning ${g.name} lights ${(body.on)?('on'):('off')}`)
    this.changeGroupState(g.id,body)
  }

  setLightBrightness(l: IHueLight, b: number) {
    let body = {bri: b}
    console.info('%c[PH]','color: purple',`Setting brightness of ${l.name} to ${Math.round((b/255)*100,)}%`);
    this.changeLightState(l.id, body)
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
          if(response.success)
          {
            this.username = response.success.username;
            this.notification.showSuccess("[PH]Hue linked successfully",`username: ${response.success.username}`)
          }
          else if(response.error)
          { this.notification.showError("[PH]Hue failed to link",`${response.error.type}: ${response.error.description}`) }
        },
        err => {
          console.error('%c[PH]','color: purple',`Error linking hub, ${err}`)
          this.notification.showError("[PH]Error linking hub", `${err}`)
        })
  }

  // Request the latest bridge state from the hue bridge -> http://<bridge ip address>/api/<username>
  updateState() {
    console.info('%c[PH]','color: purple',`Requesting bridge state`)

    this._http.get(`${this.endpoint}/${this.username}`)
      .subscribe(x => {
        let response = x as { config, groups, lights, resourcelinks, rules, scenes, schedules, sensors }
        
        this.stateUpdating = true;

        this.state.lights = []
        this.state.groups = []
        this.state.groups = []
        this.state.resourcelinks = [],
        this.state.rules = [],
        this.state.scenes = [],
        this.state.schedules = [],
        this.state.sensors = []
        
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

        this.stateUpdating = false;
      },
      err => {
        console.error('%c[PH]','color: purple',`Error getting hub state, ${err}`)
        this.notification.showError("[PH]Error getting hub state", `${err}`)
      })
  }
  
  //Change light state -> http://<bridge ip address>/api/<username>/state, PUT -> {prop:state}
  private changeLightState(ID: string, body: object) {
    this._http.put(`${this.endpoint}/${this.username}/lights/${ID}/state`, JSON.stringify(body), this.httpOptions)
      .subscribe(
        res => { this.updateState() },
        err => {
          console.error('%c[PH]','color: purple',`Error setting light state, ${err}`)
          this.notification.showError("[PH]Error setting light state", `${err}`)
        }
      )
  }

  //Change group state
  private changeGroupState(ID: string, body: object) {
    this._http.put(`${this.endpoint}/${this.username}/groups/${ID}/action`, JSON.stringify(body), this.httpOptions)
      .subscribe(
        res => { this.updateState() },
        err => {
          console.error('%c[PH]','color: purple',`Error setting group state, ${err}`)
          this.notification.showError("[PH]Error setting group state", `${err}`)
        }
      )
  }
  // Request a list of lights from hue bridge -> http://<bridge ip address>/api//<username>/lights
  private updateLight(l: IHueLight) {
    console.info('%c[PH]','color: purple',`Updating light state`)
    this._http.get(`${this.endpoint}/${this.username}/lights/${l.id}`, this.httpOptions)
      .subscribe(
        res =>{
          let response  = res as IHueLight
          const index: number = this.state.lights.findIndex(lItem => {return lItem == l})
          
          let oldID = this.state.lights[index].id
          this.state.lights[index] = response
          this.state.lights[index].id = oldID
        },
        err => {
          console.error('%c[PH]','color: purple',`Error requesting light state, ${err}`)
          this.notification.showError("[PH]Error requesting light state", `${err}`)
        }
      )
  }
  
  // Request a list of groups from hue bridge -> http://<bridge ip address>/api//<username>/groups
  private updateGroup(g: IHueGroup) {
    console.info('%c[PH]','color: purple',`Updating group state`)

    this._http.get(`${this.endpoint}/${this.username}/groups/${g.id}`, this.httpOptions)
      .subscribe(
        res =>{
          let response  = res as IHueGroup
          const index: number = this.state.groups.findIndex(gItem => {return gItem == g})
          
          let oldID = this.state.groups[index].id
          this.state.groups[index] = response
          this.state.groups[index].id = oldID
        },
        err => {
          console.error('%c[PH]','color: purple',`Error requesting group state, ${err}`)
          this.notification.showError("[PH]Error requesting group state", `${err}`)
        }
      )
  }

  // Request the latest bridge config from hue bridge -> https://<bridge ip address>/api/<username>/config
  private updateConfig() {
    console.info('%c[PH]','color: purple',`Requesting bridge config`)

    this._http.get(`${this.endpoint}/${this.username}/config`)
      .subscribe(
        res =>{
          this.state.config = res as IBridgeConfig
          this.notification.showSuccess('Philips Hue', "config updated")
        },
        err => {
         console.error('%c[PH]','color: purple',`Error requesting config, ${err}`)
         this.notification.showError("[PH]Error requesting config", `${err}`)
        }
      )
  }
}