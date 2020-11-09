import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.scss']
})
export class NavigationAdminComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

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
  }
}
