import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent implements OnInit {

  pageYoffset = 100;
  currentPage = 1;
  selectedSort;
  sort = [{id: 1, name: 'Most Relevant'},
  {id: 2, name: 'Date (Newest - Oldest)'},
  {id: 3, name: 'Date (Oldest - Newest)'},
  {id: 4, name: 'Price (Lowest - Highest)'},
  {id: 5, name: 'Price (Highest - Lowest)'},
  ];
  constructor(private scroll: ViewportScroller) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  scrollTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  selectPage(event) {

  }

  selectSort() {

  }
}
