import { RecentlyService } from './recently.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Utilities } from 'src/app/common/utilites';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/login.service';

@Component({
  selector: 'app-recently',
  templateUrl: './recently.component.html',
  styleUrls: ['./recently.component.scss'],
  providers: [MessageService]
})
export class RecentlyComponent implements OnInit {

  listRecently = [];
  constructor(
    private messageService: MessageService,
    private recentlyService: RecentlyService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private router: Router,
    private loginService: LoginService
  ) { }

  role;
  userId;
  listMark = [];
  mess: MessageSystem = new MessageSystem();
  ngOnInit(): void {
    this.getRoom();
    const user = JSON.parse(localStorage.getItem(Constants.SESSION));
    this.userId = user?.userId;
    this.role = user?.role;
    this.getListMark();
  }

  getListMark() {
    const obj = {
      userId: this.userId
    };
    this.recentlyService.getMarkRoom(obj).subscribe((res: any) => {
      this.listMark = res.data;
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
      this.recentlyService.markRoom(obj).subscribe((res: any) => {
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
    this.recentlyService.deleteMark(obj).subscribe((res: any) => {
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

  addSingle() {
    if (this.role === '' || this.utilities.isEmptyString(this.role)) {
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'Accept',
        message: this.mess.getMessage('You need login to mark room.'),
        accept: () => {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
    }
  }

  clear() {
    this.messageService.clear();
  }

  getRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.recentlyService.getRecentlyRoom().subscribe((res: any) => {
      if (res) {
        this.listRecently = res.data;
        this.overlayService.close();
      }
      this.overlayService.close();
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        key: 'err',
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
    return this.listMark.filter(x => x.room_id === data).length;
  }
}
