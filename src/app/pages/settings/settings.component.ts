import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hueConnected: boolean = false;

  constructor(private hue: PhilipsHueService) { }

  ngOnInit() {
    this.hueConnected = this.hue.connected;
  }

  connectHue() {
    this.hue.connectToBridge();
    setTimeout(() => {
      this.hueConnected = this.hue.connected;
    }, 5000);
  }
}
