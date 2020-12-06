import { RequesstSendService } from './requesst-send.service';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MessageService } from 'primeng/api';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-send',
  templateUrl: './request-send.component.html',
  styleUrls: ['./request-send.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RequestSendComponent implements OnInit {

  totalRecord;
  currentPage = 1;
  totalPage;
  listRequest = [];
  selectedRequest;

  userId;
  role;

  mess: MessageSystem = new MessageSystem();
  constructor(
    private scroll: ViewportScroller,
    private messageService: MessageService,
    public utilities: Utilities,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService,
    private requesstSendService: RequesstSendService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION))?.userId;
    this.role = JSON.parse(localStorage.getItem(Constants.SESSION))?.role;
    this.getListRequest();
  }

  getListRequest() {
    const obj = {
      userId: this.userId,
      page: this.currentPage
    };
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.requesstSendService.getListRequest(obj).subscribe((res: any) => {
      this.listRequest = res.data;
      this.overlayService.close();
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

  cancel(data) {
    this.overlayService.close();
    this.confirmationService.confirm({
      acceptLabel: 'Yes',
      key: 'info',
      message: 'Cancel this request?',
      accept: () => {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        const obj = {
          userId: this.userId,
          requestId: data._id,
          status: 'CANCEL'
        };
        this.requesstSendService.changeStatus(obj).subscribe((res: any) => {
          if (res.data.length !== 0) {
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Successfully cancel.', life: 3000});
            this.getListRequest();
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

  loadData(event) {
    this.currentPage = event.page + 1;
    this.getListRequest();
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
