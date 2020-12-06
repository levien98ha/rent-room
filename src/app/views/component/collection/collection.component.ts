import { CollectionService } from './collection.service';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Galleria } from 'primeng/galleria';
import { Utilities } from '../../../common/utilites';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  providers: [MessageService]
})
export class CollectionComponent implements OnInit {

  pageYoffset = 100;
  listMark = [];
  listMarkUser = [];
  currentPage = 1;
  totalPage = 0;
  totalRecord = 0;

  mess: MessageSystem = new MessageSystem();
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private scroll: ViewportScroller,
    private messageService: MessageService,
    private utilities: Utilities,
    private router: Router,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService
  ) { }

  userId;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION))?.userId;
    this.getListMark();
    this.getListMarkUser();
  }


  getListMarkUser() {
    const obj = {
      userId: this.userId
    };
    this.collectionService.getMarkRoomUser(obj).subscribe((res: any) => {
      this.listMarkUser = res.data;
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        message: this.mess.getMessage('Room', 'MSE00028'),
        accept: () => {

        }
      });
    });
  }

  getListMark() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      userId: this.userId,
      page: this.currentPage
    };
    this.collectionService.getMarkRoom(obj).subscribe((res: any) => {
      if (res.data) {
        this.listMark = res.data;
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
        this.overlayService.close();
      }
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        message: this.mess.getMessage('Room', 'MSE00028'),
        accept: () => {

        }
      });
    });
  }

  markRoom(data) {
    if (this.userId === '' || this.utilities.isEmptyString(this.userId)) {
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'Accept',
        message: this.mess.getMessage('You need login to mark room.'),
        accept: () => {
          this.router.navigate(['/login']);
        }
      });
    } else {
      const obj = {
        userId: this.userId,
        roomId: data._id
      };
      this.collectionService.markRoom(obj).subscribe((res: any) => {
        this.getListMark();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
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
  }

  delMarkRoom(data) {
    const obj = {
      userId: this.userId,
      roomId: data._id
    };
    this.collectionService.deleteMark(obj).subscribe((res: any) => {
      this.getListMark();
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Deleted.' });
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

  async selectPage(event) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.currentPage = await event.currentPage;
    const obj = {
      userId: this.userId,
      page: event.currentPage
    };
    await this.collectionService.getMarkRoom(obj).subscribe((res: any) => {
      if (res) {
        this.overlayService.close();
        this.listMark = res.data;
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

  getPrice(data) {
    if (data) {
      return this.utilities.formatCurrency(data) + 'VNĐ';
    }
  }

  getArea(data) {
    if (data) {
      return this.utilities.formatCurrency(data) + 'm2';
    }
  }

  checkItem(data) {
    return this.listMarkUser.filter(x => x.room_id === data).length;
  }
}
