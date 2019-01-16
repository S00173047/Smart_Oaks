import { Component, OnInit, Input } from '@angular/core';
import { env } from 'src/environments/environment';
import { IMonitor } from 'src/model/cameras.model';
import { MatDialog } from '@angular/material';
import { CameraModalComponent } from 'src/app/modals/camera-modal/camera-modal.component';

@Component({
  selector: 'camera-card',
  templateUrl: './camera-card.component.html',
  styleUrls: ['./camera-card.component.scss']
})
export class CameraCardComponent implements OnInit {
  @Input() camera: IMonitor;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  getCameraSrc(monitor) {
    // return `${env.zoneminder.endpoint}/cgi-bin-zm/nph-zms?scale=100&width=640px&height=368px&mode=jpeg&maxfps=30&monitor=${monitor}&auth=f0a044a6950f450e8fdb6aefbb644569`
    return `${env.zoneminder.endpoint}/cgi-bin-zm/nph-zms?scale=100&width=640px&height=368px&mode=jpeg&maxfps=30&monitor=${monitor}&auth=${env.zoneminder.authToken}`
  }

  openCameraModal() {
    const dialogRef = this.dialog.open(CameraModalComponent, {
      maxHeight: "500px",
      maxWidth: "1000px",
      data: this.camera
    });
  }
}