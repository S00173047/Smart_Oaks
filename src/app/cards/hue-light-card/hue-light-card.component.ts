import { Component, OnInit, Input } from '@angular/core';
import { IHueLight } from 'src/model/philips-hue.model';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'hue-light-card',
  templateUrl: './hue-light-card.component.html',
  styleUrls: ['./hue-light-card.component.scss']
})
export class HueLightCardComponent implements OnInit {
  // @Input('lightInput') light: IHueLight
  @Input('lightInput') index: string

  changingLight:boolean = false
  dropdownOpen: boolean = false;

  brightness: FormControl = new FormControl();

  constructor(public hue: PhilipsHueService) { }

  ngOnInit() {
    this.brightness.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(b => { this.hue.setLightBrightness(this.hue.state.lights[this.index],b) } );
  }

  turnOnOff() {
    this.changingLight = true
    
    this.hue.toggleLightOnOff(this.hue.state.lights[this.index])

    setTimeout(() => {
      this.changingLight = false
    }, 1000);
  }

  toggleDropdown() { this.dropdownOpen = !this.dropdownOpen }
}
