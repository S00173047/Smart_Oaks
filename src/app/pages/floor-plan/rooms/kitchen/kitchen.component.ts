import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

}
