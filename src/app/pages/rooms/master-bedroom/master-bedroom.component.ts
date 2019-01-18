import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'master-bedroom',
  templateUrl: './master-bedroom.component.html',
  styleUrls: ['./master-bedroom.component.scss']
})
export class MasterBedroomComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

}
