import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatCardModule,
  MatButtonModule,
  MatRippleModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSliderModule
} from "@angular/material";

import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DragDropModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DragDropModule,
    MatSlideToggleModule,
    MatSliderModule
  ]
})
export class AngularMaterialModule {}
