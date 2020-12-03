import { ListRoomService } from './list-room.service';
import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { ViewChild } from '@angular/core';
import { Constants } from 'src/app/common/constant/Constants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss'],
  providers: [MessageService]
})
export class ListRoomComponent implements OnInit {

  pageYoffset = 100;
  currentPage = 1;
  totalPage = 0;
  totalRecord = 0;
  selectedSort;

  sort = [{ id: 1, name: 'Most Relevant' },
  { id: 2, name: 'Date (Newest - Oldest)' },
  { id: 3, name: 'Date (Oldest - Newest)' },
  { id: 4, name: 'Price (Lowest - Highest)' },
  { id: 5, name: 'Price (Highest - Lowest)' },
  ];

  userId: any;
  listRoom = [];
  mess: MessageSystem = new MessageSystem();
  constructor(
    private scroll: ViewportScroller,
    private messageService: MessageService,
    public utilities: Utilities,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService,
    private listRoomService: ListRoomService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('session')).userId;
    this.getListRoom();
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
  }

  clear() {
    this.messageService.clear();
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  scrollTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  selectPage(event) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.currentPage = event;
    const obj = {
      page: this.currentPage
    };

    this.listRoomService.getListRoom(obj).subscribe((res: any) => {
      if (res) {
        this.overlayService.close();
        this.listRoom = res.data;
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
      }
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        message: this.mess.getMessage('MSE00051'),
        accept: () => {

        }
      });
    });
  }

  selectSort() {

  }

  getListRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.listRoomService.getListRoom({page: 1}).subscribe((res: any) => {
      if (res) {
        this.overlayService.close();
        this.listRoom = res.data;
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
      }
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        message: this.mess.getMessage('MSE00051'),
        accept: () => {

        }
      });
    });
  }

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }

  getAddress(city, district, ward) {
    let result = '';
    if (city) {
      result += city;
      if (district) {
        result += ', ' + district;
        if (ward) {
          result += ', ' + ward;
        }
      }
    }
    return result;
  }
}
