import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { IMonitor } from 'src/model/cameras.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private hue: PhilipsHueService, private cameras: CamerasService) { }

  ngOnInit() { }

  connectHue() {
    this.hue.connectToBridge();
  }

  connectZoneminder() {

  }
}
