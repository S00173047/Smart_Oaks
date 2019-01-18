import { Component, OnInit, Input } from '@angular/core';
import { IHueLight } from 'src/model/philips-hue.model';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'hue-light-card',
  templateUrl: './hue-light-card.component.html',
  styleUrls: ['./hue-light-card.component.scss']
})
export class HueLightCardComponent implements OnInit {
  // @Input('lightInput') light: IHueLight
  @Input('lightInput') index: string

  changingLight:boolean = false

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

  turnOnOff() {
    this.changingLight = true
    
    this.hue.toggleLightOnOff(this.hue.state.lights[this.index])

    setTimeout(() => {
      this.changingLight = false
    }, 1000);
  }

}
