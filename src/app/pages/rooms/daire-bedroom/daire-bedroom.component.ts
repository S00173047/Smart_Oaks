import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'daire-bedroom',
  templateUrl: './daire-bedroom.component.html',
  styleUrls: ['./daire-bedroom.component.scss']
})
export class DaireBedroomComponent implements OnInit {

  constructor(private hue: PhilipsHueService) { }

  ngOnInit() { }

  logLights() {
    console.log('--------------------------')
    console.log(this.hue.state)
  }

}
