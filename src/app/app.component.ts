import { Component, OnInit, OnDestroy } from '@angular/core';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { RequestZoneminderAuth } from 'src/redux/actions/camera.actions';
import { Store } from '@ngxs/store';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { NotificationService } from 'src/services/notification/notification.service';
import { Observable, interval } from 'rxjs';
import { NetatmoService } from 'src/services/netatmo/netatmo.service';
import { GoogleCastService } from 'src/services/google-cast/google-cast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private cams: CamerasService,
    private hue: PhilipsHueService,
    private netatmo: NetatmoService,
    private cast: GoogleCastService)  { }

  ngOnInit() {
    this.cams.login();
    this.hue.updateState();
    this.hue.startRefreshing();
    this.netatmo.startTokenRefreshing();

    this.cast.getCastDeviceInfo('10.0.0.112').subscribe(res => {
      console.log(res)
    });
  }
}
