import { Component, OnInit } from '@angular/core';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { IMonitor } from 'src/model/cameras.model';
import { env } from 'src/environments/environment';
import { Select, Store } from '@ngxs/store';
import { CameraState, CameraStateModel } from 'src/redux/states/camera.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {
  
  constructor(private zoneminder: CamerasService, private store: Store) { }

  ngOnInit() {
    // this.store.dispatch(new RequestZoneminderAuth());

    this.loginCheck(1);
  }

  loginCheck (i: number) {
    setTimeout(() => {
      console.log(`Checking for login (${i}/10)`)
      if (i < 10 && !this.zoneminder.loggedIn)
      {
          this.loginCheck(i+1)
      }
      else
      {
        console.log("Logged in succesfully")
        this.postLogin();
      }
    }, 500)
  }

  postLogin() {
    this.zoneminder.getMonitors();
  }
}
