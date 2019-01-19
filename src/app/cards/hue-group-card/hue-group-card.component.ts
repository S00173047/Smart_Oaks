import { Component, OnInit, Input } from '@angular/core';
import { IHueGroup, IHueLight } from 'src/model/philips-hue.model';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'hue-group-card',
  templateUrl: './hue-group-card.component.html',
  styleUrls: ['./hue-group-card.component.scss']
})
export class HueGroupCardComponent implements OnInit {
  // @Input('groupInput') group: IHueGroup;
  @Input('groupInput') index: string;

  changingLights:boolean = false

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

  turnOnOff() {
    this.changingLights = true;
    
    this.hue.toggleGroupOnOff(this.hue.state.groups[this.index])

    setTimeout(() => {
      this.changingLights = false;
    }, 2000);
  }
}
