import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

}
