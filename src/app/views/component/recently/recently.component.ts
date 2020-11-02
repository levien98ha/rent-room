import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently',
  templateUrl: './recently.component.html',
  styleUrls: ['./recently.component.scss']
})
export class RecentlyComponent implements OnInit {

  price = '1,500,000 VNĐ';
  address = 'Liên Chiểu, Đà Nẵng';
  area = '25 m2';
  time = '2020/11/01';
  constructor() { }

  ngOnInit(): void {
  }

}
