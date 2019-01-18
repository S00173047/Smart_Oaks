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

  changingLight:boolean = false

  constructor(private hue: PhilipsHueService) { }

  ngOnInit() {
  }

  turnOnOff() {
    this.changingLight = true
    
    this.hue.toggleLightOnOff(this.light)

    setTimeout(() => {
      this.changingLight = false
      console.log("Test")
    }, 2000);
  }

}
