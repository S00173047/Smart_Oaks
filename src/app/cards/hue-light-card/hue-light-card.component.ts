import { Component, OnInit, Input } from '@angular/core';
// import { ILight } from 'src/model/philips-hue.model';

@Component({
  selector: 'hue-light-card',
  templateUrl: './hue-light-card.component.html',
  styleUrls: ['./hue-light-card.component.scss']
})
export class HueLightCardComponent implements OnInit {
  // @Input('lightInput') light: ILight

  constructor() { }

  ngOnInit() {
  }

}
