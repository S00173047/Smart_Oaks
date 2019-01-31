import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'house-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() selectEmit: EventEmitter<number> = new EventEmitter();
  selectedRoom: null;
  sortedRooms = [];
  selectedFloor: number = 0;
  roomSvg = {
    0: {
      border: { d: 'M5,5 L5,745, L170,745 L170,810 L320,810 L320,745 L395,745 L395,190 L190,190 L190,5 Z' },
      stokedAreas: [
        { d: 'M0,0 l400,0 l0,815 l-400,0 Z' },
      ],
      rooms: [
        { //Placeholder so no room selected to begin with
          id: '0',
          name: {text: '', x: 0, y: 0 },
          area: { d: '' },
          border: { d: '' }
        },
        {
          id: '1',
          name: { text: 'Utility', x: 95, y: 50 },
          area: { d: 'M5,5 l185,0 l0,90 l-185,0 Z' },
          border: { d: 'M135,95 l-130,0 l0,-90 l185,0 l0,90 l-15,0'},
        },
        {
          id: '2',
          name: { text: 'Kitchen', x: 190, y: 260 },
          area: { d: 'M5,95 l0,220 l95,0 l0,80 l295,0 l0,-205 l-205,0 l0,-95 Z' },
          border: { d: 'M135,95 l-130,0 l0,220 l95,0 l0,80 l15,0' +
                       'M155,395l 240,0 l0,-205 l-205,0 l0,-25' +
                       'M175,95 l15,0 l0,30' },
        },
        {
          id: '3',
          name: { text: 'Toilet', x: 50, y: 370 },
          area: { d: 'M5,315 l95,0 l0,80 l-35,25 l-60,0Z' },
          border: { d: 'M15,420 l-10,0 l0,-105 l95,0 l0,80 l-35,25 l-10,0' },
        },
        {
          id: '4',
          name: { text: 'Hallway', x: 50, y: 580 },
          area: { d: 'M5,420 l0,325 l85,0 l0,-235 l70,-55 l40,0 l0,-60 l-100,0 l-35,25' },
          border: { d: 'M15,420 l-10,0 l0,325 l10,0' +
                       'M55,745 l35,0 l0,-115' +
                       'M90,550 l0,-40 l70,-55 l40,0' +
                       'M155,395 l45,0' +
                       'M55,420 l10,0 l35,-25 l15,0'},
        },
        {
          id: '5',
          name: { text: 'Living Room', x: 240, y: 600 },
          area: { d: 'M90,745 l80,0 l0,65 l150,0 l0,-65 l75,0 l0,-290 l-235,0 l-70,55 Z' },
          border: { d: 'M90,630 l0,115 l80,0 l0,65 l150,0 l0,-65 l75,0 l0,-290 l-235,0 l-70,55 l0,40' },
        },
        {
          id: '6',
          name: { text: 'Second Floor', x: 265, y: 430 },
          area: { d: 'M190,395 l0,60 l205,0 l0,-60Z' },
          border: { d: 'M190,395 l205,0 l0,60 l-205,0' },
        }
      ]
    },
    1: {
      border: { d: 'M5,190 L5,745, L170,745 L170,810 L320,810 L320,745 L395,745 L395,190 L190,190 Z' },
      stokedAreas: [
        { d: 'M0,0 l400,0 l0,815 l-400,0 Z' },
      ],
      rooms: [
        {
          id: '7',
          name: { text: 'Cians Bedroom', x: 67, y: 290 },
          area: { d: 'M5,190 l155,0 l0,80 l-30,0 l0,125 l-125,0Z' },
          border: { d: 'M130,340 l0,-70 l30,0 l0,-80 l-155,0 l0,205 l125,0 l0,-15'},
        },
        {
          id: '8',
          name: { text: 'Daires Bedroom', x: 290, y: 290 },
          area: { d: 'M160,190 l235,0 l0,205 l-205,0 l0,-125 l-30,0Z' },
          border: { d: 'M190,340 l0,-70 l-30,0 l0,-80 l235,0 l0,205 l-205,0 l0,-15' },
        },
        {
          id: '9',
          name: { text: 'Bathroom', x: 67, y: 460 },
          area: { d: 'M5,395 l125,0 l0,115 l-125,0Z' },
          border: { d: 'M130,490 l0,20 l-125,0 l0,-115 l125,0 l0,55' },
        },
        {
          id: '10',
          name: { text: 'Aoife Bedroom', x: 80, y: 650 },
          area: { d: 'M5,510 l0,235 l155,0 l0,-180 l-30,-55' },
          border: { d: 'M135,520 l-5,-10 l-125,0 l0,235 l155,0 l0,-180 l-5,-10'},
        },
        {
          id: '11',
          name: { text: 'Master Bedroom', x: 260, y: 650 },
          area: { d: 'M160,565 l0,180 l10,0 l0,65 l150,0 l0,-65 l75,0 l0,-225 l-165,0Z' },
          border: { d: 'M175,555 l-15,10 l0,180 l10,0 l0,65 l150,0 l0,-65 l75,0 l0,-225 l-165,0 l-15,10'
         },
        },
        {
          id: '12',
          name: { text: 'HP', x: 160, y: 305 },
          area: { d: 'M130,270, l60,0 l0,60 l-60,0Z' },
          border: { d: 'M140,330 l-10,0 l0,-60 l60,0 l0,60 l-10,0' },
        },
        {
          id: '13',
          name: { text: 'Landing', x: 200, y: 490 },
          area: { d: 'M130,330 l0,180 l30,55 l70,-45 l165,0 l0,-125 l-55,0 l0,60 l-150,0 l0,-125Z' },
          border: { d: 'M140,330 l-10,0 l0,10' +
                       'M130,380 l0,70' +
                       'M180,330 l10,0 l0,10' +
                       'M190,380 l0,15 l205,0 l0,125 l-165,0 l-15,10' +
                       'M130,490 l0,20 l5,10' +
                       'M155, 555 l5,10 l15,-10' +
                       'M190,395 l0,60 l150,0' }
         },
         {
           id: '14',
           name: { text: 'Ground Floor', x: 265, y: 430 },
           area: { d: 'M190,395 l0,60 l150,0 l0,-60Z' },
           border: { d: 'M340,395 l-150,0 l0,60 l150,0' },
        },
      ],
    }
  };

  constructor() { }

  ngOnInit() {
    this.selectRoom('0');
  }

  private sortRooms() {
    this.sortedRooms = this.roomSvg[this.selectedFloor].rooms.slice(0).sort((a, b) => {
      if (a.id === this.selectedRoom) {
        return 1;
      }
      if (b.id === this.selectedRoom) {
        return -1;
      }
      return 0;
    });
  }

  selectRoom(roomNumber) {
    if(roomNumber == '6' || roomNumber == '14')
    {
      this.changeFloor()
    }
    else
    {
      this.selectEmit.emit(roomNumber);
      this.selectedRoom = roomNumber;
    }
    this.sortRooms()
  }

  changeFloor() {
    switch(this.selectedFloor) {
      case 0:
        this.selectedFloor = 1;
        break;
      case 1:
        this.selectedFloor = 0;
        break;
    }
  }
}
