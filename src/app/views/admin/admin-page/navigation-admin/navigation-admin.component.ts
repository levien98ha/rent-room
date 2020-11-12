import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.scss']
})
export class NavigationAdminComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  @Output() chooseComponent: EventEmitter<any> = new EventEmitter<any>();

  clicked: boolean;
  choseTag = 1;
  constructor() {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit(): void {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  choseDashboard() {
    this.choseTag = 1;
    this.chooseComponent.emit(1);
  }

  choseProfile() {
    this.choseTag = 2;
    this.chooseComponent.emit(2);
  }

  choseManager() {
    this.choseTag = 3;
    this.chooseComponent.emit(3);
  }

  choseInvoice() {
    this.choseTag = 4;
    this.chooseComponent.emit(4);
  }
}
