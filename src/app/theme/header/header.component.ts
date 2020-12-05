import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin = true;
  selectTag = 1;
  constructor(private router: Router) { }

  role;
  checkUser = false;
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('session')).role;
    if (this.role === 'user') {
      this.checkUser = true;
    }
    switch (this.router.url) {
      case '/room':
        this.selectTag = 2;
        break;
      case '/request':
        this.selectTag = 3;
        break;
      case '/collect':
        this.selectTag = 4;
        break;
      case '/about-us':
        this.selectTag = 5;
        break;
      default: this.selectTag = undefined;
    }
  }

  changeHome() {
    this.selectTag = 1;
  }

  changeRoom() {
    this.selectTag = 2;
  }

  changeRequest() {
    this.selectTag = 3;
  }

  changeCollect() {
    this.selectTag = 4;
  }

  changeAbout() {
    this.selectTag = 5;
  }

  logOut() {
    this.isLogin = false;
  }
}
