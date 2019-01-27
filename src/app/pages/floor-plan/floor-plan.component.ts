import { Component, OnInit } from '@angular/core';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss']
})
export class FloorPlanComponent implements OnInit {
  rooms = {
    // 1: 'utility',
    2: 'kitchen',
    // 3: 'toilet',
    4: 'hallway',
    5: 'sitting-room',
    
    // 7: 'cian-bedroom',
    8: 'daire-bedroom',
    // 9: 'bathroom',
    // 10: 'aoife-bedroom',
    11: 'master-bedroom',
    // 12: 'hot-press',
    13: 'landing'
  }

  constructor(public hue: PhilipsHueService, private router: Router) { }

  ngOnInit() { }

  logLights() {
    console.log(this.hue.state)
  }

  showRoom(r: number) {
    if(this.rooms[r] != null){
      this.router.navigate([`app/rooms/${this.rooms[r]}`]);
    }
    else {
      this.router.navigate([`app/rooms/`]);
    }
  }
}
