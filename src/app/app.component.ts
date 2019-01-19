import { Component, OnInit, OnDestroy } from '@angular/core';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { RequestZoneminderAuth } from 'src/redux/actions/camera.actions';
import { Store } from '@ngxs/store';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { NotificationService } from 'src/services/notification/notification.service';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  sub:Observable<number> = interval(this.hue.refreshRate)

  constructor(private cams: CamerasService, private hue: PhilipsHueService)  { }


  ngOnInit() {
    this.cams.login();
    this.hue.updateState();
    
    this.sub.subscribe(x => {this.hue.updateState()} );
  }

  ngOnDestroy() {
  }
}
