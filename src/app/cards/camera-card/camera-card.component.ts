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
  feedSrc: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.getCameraSrc();
  }

  getCameraSrc() {
    this.feedSrc = `${env.zoneminder.endpoint}/cgi-bin-zm/nph-zms?scale=100&width=640px&height=368px&mode=jpeg&maxfps=30&monitor=${this.camera.Monitor.Id}&auth=${env.zoneminder.authToken}`
  }

  openCameraModal() {
    const dialogRef = this.dialog.open(CameraModalComponent, {
      maxWidth: "1000px",
      data: {
        camera: this.camera,
        feedSrc: this.feedSrc
      }
    });
  }
}