import { Component, ViewChild, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'sample',
  templateUrl: 'drag-scroll.component.html',
  styleUrls: ['drag-scroll.component.scss'],
  animations: [
    // animation triggers go here
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class SampleBigText implements AfterViewInit {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  scroll;
  slidesScrolled;
  slidesInterval;
  show;
  currentIndex;
  places;
  placesInterval;
  placesScrolled = 0;
  width;
  moveTo;
  from;
  to;
  transform;
  svg;
  constructor() {
    this.places = [{ travelPlace: 'Dubai' }, { travelPlace: 'Paris' }, { travelPlace: 'Amsterdam' }];
    this.places[this.placesScrolled].hideme = true;
    this.width = window.innerWidth;
    this.from = '0 0';
    this.to = this.width + ' 0';
    this.moveTo = this.width / 4;
    console.log(this.moveTo);
    this.transform ='matrix(0.11069 0 0 0.11069 0 300)';
  }
  ngAfterViewInit() {
    this.slidesScrolled = 0
    this.slidesInterval = setInterval(x => {
      this.moveRight();
      this.slidesScrolled++;
      if (this.slidesScrolled == 3) {
        this.placesChanges();
      }
      console.log(this.moveTo , this.slidesScrolled);
      if(this.slidesScrolled > 0){
        this.transform ='matrix(0.11069 0 0 0.11069 '+this.moveTo * (this.slidesScrolled)+' 300)';
        this.show = true;
      }
      if (this.slidesScrolled == 4) {
         clearInterval(this.slidesInterval);
         this.transform ='matrix(0.11069 0 0 0.11069 '+this.moveTo * (this.slidesScrolled + 2)+' 300)';
      }
      
    }, 3000);

    console.log(this.ds);
  }
  moveRight() {
    this.ds.moveRight();
  }

  placesChanges() {
    this.placesInterval = setInterval(x => {
      this.places[this.placesScrolled].hideme = false;
      this.placesScrolled++;
      this.places[this.placesScrolled].hideme = true;
      if (this.placesScrolled == this.places.length - 1) {
        clearInterval(this.placesInterval);
      }
    }, 3000 / this.places.length);
  }

  //   moveRight() {
  //     this.ds.moveRight();
  //   }
  slideChanged(index) {
    this.currentIndex = index;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
}