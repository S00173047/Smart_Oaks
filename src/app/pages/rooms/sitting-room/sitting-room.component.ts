import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';

@Component({
  selector: 'sitting-room',
  templateUrl: './sitting-room.component.html',
  styleUrls: ['./sitting-room.component.scss']
})
export class SittingRoomComponent implements OnInit {

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
  }

}
