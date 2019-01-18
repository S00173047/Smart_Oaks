import { Component, OnInit, Input } from '@angular/core';
import { IHueLight } from 'src/model/philips-hue.model';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'hue-light-card',
  templateUrl: './hue-light-card.component.html',
  styleUrls: ['./hue-light-card.component.scss']
})
export class HueLightCardComponent implements OnInit {
  @Input('lightInput') light: IHueLight

  constructor(private hue: PhilipsHueService) { }

  ngOnInit() {
  }

  turnOnOff() {
    this.hue.toggleLightOnOff(this.light)
  }

}
