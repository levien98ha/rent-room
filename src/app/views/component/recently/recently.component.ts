import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-recently',
  templateUrl: './recently.component.html',
  styleUrls: ['./recently.component.scss'],
  providers: [MessageService]
})
export class RecentlyComponent implements OnInit {

  price = '1,500,000 VNĐ';
  address = 'Liên Chiểu, Đà Nẵng';
  area = '25 m2';
  time = '2020/11/01';
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
  }

  clear() {
    this.messageService.clear();
  }
}
