import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { IMonitor } from 'src/model/cameras.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hueRefreshRate: FormControl = new FormControl(this.hue.refreshRate);

  constructor(public hue: PhilipsHueService, public cameras: CamerasService) { }

  ngOnInit() { }

  connectHue() {
    this.hue.connectToBridge();
  }

  setHueRefreshRate () {
    this.hue.refreshRate = this.hueRefreshRate.value;
    this.hueRefreshRate.setValue(this.hue.refreshRate)
  }

  connectZoneminder() {

  }
}
