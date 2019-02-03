import { Component, OnInit } from '@angular/core';
import { NetatmoService } from 'src/services/netatmo/netatmo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private netatmo: NetatmoService
  ) { }

  ngOnInit() {
  }

  test() {
    console.log(this.netatmo.state);
  }
}
