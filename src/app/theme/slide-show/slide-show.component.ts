import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  @Output() searchHearder = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  clickSearchHeader() {
    this.searchHearder.emit(true);
  }
}
