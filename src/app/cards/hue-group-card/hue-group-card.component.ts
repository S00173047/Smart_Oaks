import { Component, OnInit, Input } from '@angular/core';
import { IHueGroup } from 'src/model/philips-hue.model';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'hue-group-card',
  templateUrl: './hue-group-card.component.html',
  styleUrls: ['./hue-group-card.component.scss']
})
export class HueGroupCardComponent implements OnInit {
  @Input('groupInput') group: IHueGroup;
  
  changingLights:boolean = false

  constructor(private hue: PhilipsHueService) { }

  ngOnInit() {
    // this.group
  }
}
