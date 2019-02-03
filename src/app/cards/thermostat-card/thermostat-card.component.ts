import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetatmoService } from 'src/services/netatmo/netatmo.service';
import { INAHome, INAModule, INASchedule } from 'src/model/netatmo.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'thermostat-card',
  templateUrl: './thermostat-card.component.html',
  styleUrls: ['./thermostat-card.component.scss']
})
export class ThermostatCardComponent implements OnInit{
  home: INAHome;
  battery: number;
  temp = {
    target: 0,
    measured: 0
  }

  currentSchedule: INASchedule;

  constructor(public netatmo: NetatmoService) { }

  ngOnInit() {
    this.startRefreshing()
    if(this.netatmo.state.homes)
    {
      this.updateTherm()
    }
  }

  // ngOnDestroy() { this.sub.unsubscribe() }

  sub: Subscription
  startRefreshing() {
    this.sub = interval(30000).subscribe(x => {
      this.updateTherm();
    })
  }

  test() {
    console.log(this.home)
    console.log(this.netatmo.state.homes)
    console.log(new Date().getTime() + (2*60*60*1000))
  }
  
  changeTemp(inc: number) {
    let newTemp = this.temp.target + (inc > 0?0.5:-0.5);
    this.netatmo.SetRoomThermPoint(
      this.netatmo.state.homes[0].id,
      this.netatmo.state.homes[0].rooms[0].id,
      newTemp,
      (new Date().getTime() + (1*60*60*1000)) //Add two hours to current time
    )

    this.temp.target = newTemp
  }

  updateTherm() {
    this.netatmo.GetHomeStatus(this.netatmo.state.homes[0].id)
    .subscribe(x => {
      this.temp.target = x.rooms[0].therm_setpoint_temperature
      this.temp.measured = x.rooms[0].therm_measured_temperature
      this.battery = x.modules.filter(x => {return x.type == 'NATherm1'})[0].battery_level;
      this.home = x
    }) //.modules.filter(m => {return m.type == 'NATherm1'})
  }
}
