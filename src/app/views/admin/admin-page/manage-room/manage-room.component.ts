import { ManageRoomService } from './manage-room.service';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constant/Constants';
import { ManageUserService } from '../manage-user/manage-user.service';
import { Utilities } from 'src/app/common/utilites';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { ConfirmationService } from 'primeng/api';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/views/login/login.service';
@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ManageRoomComponent implements OnInit {

  totalRecord;
  listRequest = [];
  selectedRequest;
  totalPage;

  checkRole = false;
  role;
  userId;
  currentPage = 1;
  mess: MessageSystem = new MessageSystem();
  constructor(
    public manageRoomService: ManageRoomService,
    private manageUserService: ManageUserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private loginService: LoginService) {
    const user = JSON.parse(localStorage.getItem(Constants.SESSION));
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION))?.userId;
    this.role = user?.role;
    if (this.role !== 'user') {
        this.checkRole = true;
    }
  }

  ngOnInit(): void {
    this.getListRequestOwner();
  }

  loadData(event) {
    this.currentPage = event.page + 1;
    this.getListRequestOwner();
  }

  accept(data) {
    this.overlayService.close();
    this.confirmationService.confirm({
      acceptLabel: 'Yes',
      key: 'info',
      message: 'Accept this request?',
      accept: () => {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        const obj = {
          userId: this.userId,
          requestId: data._id,
          status: 'ACCEPT'
        }
        this.manageRoomService.accept(obj).subscribe((res: any) => {
          if (res.data.length !== 0) {
           this.getListRequestOwner();
          }
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
    });
  }

  denided(data) {
    this.overlayService.close();
    this.confirmationService.confirm({
      acceptLabel: 'Yes',
      key: 'info',
      message: 'Accept this request?',
      accept: () => {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        const obj = {
          userId: this.userId,
          requestId: data._id,
          status: 'DENIED'
        }
        this.manageRoomService.accept(obj).subscribe((res: any) => {
          if (res.data.length !== 0) {
           this.getListRequestOwner();
          }
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
    });
  }

  getListRequestOwner() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      userId: this.userId,
      page: this.currentPage
    };
    this.manageRoomService.getListRequestByOwner(obj).subscribe((res: any) => {
      if (res) {
        this.listRequest = res.data;
        this.totalRecord = res.total;
        this.totalPage = res.pageSize;
        this.overlayService.close();
      }
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

  getListRequestRent(data) {

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.listRequest.length; i++) {
      if (this.listRequest[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
