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
import { ActivatedRoute, Router } from '@angular/router';

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
  search = {
    category: '',
    minArea: 0,
    maxArea: 1000,
    minPrice: 0,
    maxPrice: 100000000,
    city: '',
    district: '',
    ward: '',
    page: 1
  };
  constructor(
    private scroll: ViewportScroller,
    private messageService: MessageService,
    public utilities: Utilities,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService,
    private listRoomService: ListRoomService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.queryParams?.subscribe(params => {
        this.search.category = params.category ? params.category : '';
        this.search.minPrice = params.minPrice ? params.minPrice : 0;
        this.search.maxPrice = params.maxPrice ? params.maxPrice : 100000000;
        this.search.minArea = params.minArea ? params.minArea : 0;
        this.search.maxArea = params.maxArea ? params.maxArea : 1000;
        this.search.city = params.city ? params.city : '';
        this.search.district = params.district ? params.district : '';
        this.search.ward = params.ward ? params.ward : '';
    });
    }

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

  async selectPage(event) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.currentPage = await event.currentPage;
    // const obj = {
    //   page: this.currentPage
    // };
    this.search.page = await event.currentPage;
    await this.listRoomService.getListRoom(this.search).subscribe((res: any) => {
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
    console.log(this.search);
    this.listRoomService.getListRoom(this.search).subscribe((res: any) => {
      if (res) {
        this.listRoom = res.data;
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
        this.overlayService.close();
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
