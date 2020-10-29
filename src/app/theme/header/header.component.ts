import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectTag = 1;
  constructor(private router: Router) { }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/room':
        this.selectTag = 2;
        break;
      case '/news':
        this.selectTag = 3;
        break;
      case '/about':
        this.selectTag = 4;
        break;
      default: this.selectTag = 1;
    }
  }

  changeHome() {
    this.selectTag = 1;
  }

  changeRoom() {
    this.selectTag = 2;
  }

  changeNews() {
    this.selectTag = 3;
  }

  changeAbout() {
    this.selectTag = 4;
  }
}
