import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
  menuItems = [
    { 
        path: 'floor-plan', 
        title: 'Floor Plan'
    },
    { 
        path: 'sitting-room', 
        title: 'Sitting Room'
    },
    { 
        path: 'kitchen', 
        title: 'Kitchen'
    },
    { 
        path: 'hallway', 
        title: 'Hallway/ Landing'
    },
    {
        path: 'master-bedroom',
        title: 'Master Bedroom'
    },
    { 
        path: 'daire-bedroom', 
        title: 'Daires Bedroom'
    }
  ];;

  constructor() { }

  ngOnInit() {
  }

}
