import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMonitor, IEvent } from 'src/model/cameras.model';
import { env } from 'src/environments/environment';
import { CamerasService } from 'src/services/cameras/cameras.service';

@Component({
  selector: 'camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss']
})
export class CameraModalComponent implements OnInit {
  camera: IMonitor;
  feedSrc: string;
  events: any = [];
  
  constructor(
    private _camService: CamerasService,
    public dialogRef: MatDialogRef<CameraModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:{camera: IMonitor, feedSrc: string}
  ) {
    this.camera = data.camera;
    this.feedSrc = data.feedSrc;
    this.getCameraEvents();
  }

  ngOnInit() {
    // this.getCameraEvents();
  }

  getCameraEvents() {
    this._camService.getEventsForMonitor(this.camera.Monitor.Id).subscribe(res => {
      this.events = res as IEvent[]
    })
  }

  openEventLink(e: IEvent) {
    window.open(`${env.zoneminder.endpoint}/cgi-bin-zm/nph-zms?mode=jpeg&frame=1&replay=none&source=event&event=${e.Event.Id}&auth=${env.zoneminder.authToken}`,"_blank");
  }
}
