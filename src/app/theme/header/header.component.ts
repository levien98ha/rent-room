import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  selectTag = 1;
  profile;

  constructor(private router: Router, private headerService: HeaderService, private loginService: LoginService) { }

  role;
  userId;
  checkUser = false;
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('session'))?.role;
    this.userId = JSON.parse(localStorage.getItem('session'))?.userId;
    if (this.role === 'user') {
      this.checkUser = true;
    }

    if (this.userId) {
      this.isLogin = true;
      const user = {
        _id: this.userId
      };
      this.headerService.getProfileUser(user).subscribe(async (res: any) => {
        this.profile = await res.user;
      });
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
    localStorage.removeItem('session');
    this.loginService.user.userId = '';
    this.loginService.user.role = '';
  }
}
