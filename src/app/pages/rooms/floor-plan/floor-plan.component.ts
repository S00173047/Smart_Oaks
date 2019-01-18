import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss']
})
export class FloorPlanComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() { }

  logLights() {
    console.log(this.hue.state)
  }

}
