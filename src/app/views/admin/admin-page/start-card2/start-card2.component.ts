import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-card2',
  templateUrl: './start-card2.component.html',
  styleUrls: ['./start-card2.component.scss']
})
export class StartCard2Component implements OnInit {

  objectCard = {
    price: '30,000,000 VNĐ',
    price_append: '3,000,000 VNĐ',
    total_room: 10,
    room_rent: 7,
    people: 10,
    mark: 2000
  };

  constructor() { }

  ngOnInit(): void {
  }

}
