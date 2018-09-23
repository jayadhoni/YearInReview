import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleBigText } from './drag-scroll.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  declarations: [
    AppComponent,SampleBigText
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragScrollModule,
    NgCircleProgressModule.forRoot({
      "backgroundStrokeWidth": 0,
      "radius": 60,
      "space": -10,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "showSubtitle": false

    })
  ],
  providers: [],
  bootstrap: [SampleBigText]
})
export class AppModule { }
