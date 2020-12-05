import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'src/app/common/constant/Constants';
import { LoginService } from 'src/app/views/login/login.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];

  specialPage: boolean;

  private specialPages: any[] = [
    '/pages/login',
    '/pages/register',
    '/pages/lock',
    '/pages/pricing',
    '/pages/single-post',
    '/pages/post-listing'
  ];

  private currentUrl = '';

  chooseTag = 1;
  role;
  userId;
  constructor(
    private router: Router,
    private location: Location,
    private loginService: LoginService) {
      this.router.events.subscribe((route:any) => {
        this.currentUrl = route.url;

        this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
      });
    }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem(Constants.SESSION));
    this.role = user?.role;
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION))?.userId;
  }

  goBack(): void {
    this.location.back();
  }

  choose(event) {
    this.chooseTag = event;
  }

}
