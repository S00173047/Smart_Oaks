import { Component, OnInit } from '@angular/core';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { RequestZoneminderAuth } from 'src/redux/actions/camera.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private cams: CamerasService) {
  }

  ngOnInit() {
  }
}
