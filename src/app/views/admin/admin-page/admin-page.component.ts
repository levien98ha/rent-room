import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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

  constructor(
    private router: Router,
    private location: Location) {
      this.router.events.subscribe((route:any) => {
        this.currentUrl = route.url;

        this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
      });
    }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  choose(event) {
    this.chooseTag = event;
  }

}
