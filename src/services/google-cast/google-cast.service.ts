import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { env } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MulticastOperator } from 'rxjs/internal/operators/multicast';

@Injectable({
  providedIn: 'root'
})
export class GoogleCastService {
  
  APP_BACKDROP = "E8C28D3C"
  APP_YOUTUBE = "233637DE"
  APP_SPOTIFY = "CC32E753"
  
  // Regular chromecast, supports video/audio
  CAST_TYPE_CHROMECAST = 'cast'
  // Cast Audio device, supports only audio
  CAST_TYPE_AUDIO = 'audio'
  // Cast Audio group device, supports only audio
  CAST_TYPE_GROUP = 'group'

  CAST_TYPES = {
    'chromecast': this.CAST_TYPE_CHROMECAST,
    'eureka dongle': this.CAST_TYPE_CHROMECAST,
    'chromecast audio': this.CAST_TYPE_AUDIO,
    'google home': this.CAST_TYPE_AUDIO,
    'google cast group': this.CAST_TYPE_GROUP,
  }

  constructor(private _http: HttpClient, private notification: NotificationService) { }

  getCastDeviceInfo(device_ip: string) {
    console.info('%c[CC]','color: orange',`getting cast device info (${device_ip})`)

    return this._http.get(`http://temp.com`)
  }

  //Get all chromecast app IDs -> https://clients3.google.com/cast/chromecast/device/baseconfig
  getAllAppIds() {

    return this._http.get(`https://cors-anywhere.herokuapp.com/https://clients3.google.com/cast/chromecast/device/baseconfig`)
    .pipe(map(
      res => {
        let response = res
        console.log(response)
        return response;
      },
      err => {
        console.error('%c[CC]','color: red',`Error getting app IDs, ${err.message}`)
        this.notification.showError("[CC]Error getting cast app IDs", `${err.message}`)
      }))
  }

  //Get app config -> https://clients3.google.com/
  getAppConfig(appid) {

    return this._http.get(`https://cors-anywhere.herokuapp.com/https://clients3.google.com/cast/chromecast/device/app?a=${appid}`)
    .pipe(map(
      res => {
        let response = res
        console.log(response)
        return response;
      },
      err => {
        console.error('%c[CC]','color: red',`Error getting app config, ${err.message}`)
        this.notification.showError("[CC]Error getting app config", `${err.message}`)
      }))
  }

  //Reboot a chromecast
  rebootDevice(device_ip) {

    return this._http.post(`http://${device_ip}:8008/setup/reboot`,`{"params":"now"}"`)
    .pipe(map(
      res => {
        let response = res
        console.log(response)
        return response;
      },
      err => {
        console.error('%c[CC]','color: red',`Error getting app config, ${err.message}`)
        this.notification.showError("[CC]Error getting app config", `${err.message}`)
      }))
  }
}
