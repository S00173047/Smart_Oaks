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
  events: any = [];

  constructor(
    private _camService: CamerasService,
    public dialogRef: MatDialogRef<CameraModalComponent>,
    @Inject(MAT_DIALOG_DATA) public camera: IMonitor
  ) { }

  ngOnInit() {
    this.getCameraEvents();
  }

  getCameraSrc(monitor) {
    return `${env.zoneminder.endpoint}/cgi-bin-zm/nph-zms?scale=100&width=640px&height=368px&mode=jpeg&maxfps=30&monitor=${monitor}&auth=${env.zoneminder.authToken}`
  }

  getCameraEvents() {
    this._camService.getEventsForMonitor(this.camera.Monitor.Id).subscribe(res => {
      this.events = res as IEvent[]
      console.log(this.events);
    })
  }
}
