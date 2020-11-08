import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss'],
  providers: [MessageService]
})
export class ListRoomComponent implements OnInit {

  pageYoffset = 100;
  currentPage = 1;
  selectedSort;
  sort = [{ id: 1, name: 'Most Relevant' },
  { id: 2, name: 'Date (Newest - Oldest)' },
  { id: 3, name: 'Date (Oldest - Newest)' },
  { id: 4, name: 'Price (Lowest - Highest)' },
  { id: 5, name: 'Price (Highest - Lowest)' },
  ];
  constructor(private scroll: ViewportScroller, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
  }

  clear() {
    this.messageService.clear();
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
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
