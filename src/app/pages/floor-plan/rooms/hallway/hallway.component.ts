import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'hallway',
  templateUrl: './hallway.component.html',
  styleUrls: ['./hallway.component.scss']
})
export class HallwayComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

}
