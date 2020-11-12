import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent implements OnInit {

  objectCard = {
    price: '30,000,000 VNĐ',
    price_append: '3,000,000 VNĐ',
    total_room: 10,
    room_rent: 7,
    people: 10
  };

  constructor() { }

  ngOnInit(): void {
  }

}
