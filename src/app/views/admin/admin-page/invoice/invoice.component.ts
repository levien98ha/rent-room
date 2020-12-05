import { InvoiceService } from './invoice.service';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constant/Constants';
import { Utilities } from 'src/app/common/utilites';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { ConfirmationService } from 'primeng/api';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/login.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InvoiceComponent implements OnInit {

  totalRecord;
  currentPage = 1;
  listRoom = [];
  selectedRoom;
  userId;
  totalPage;
  mess: MessageSystem = new MessageSystem();
  constructor(
    private invoiceService: InvoiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('session'))?.userId;
    if (this.utilities.isEmptyString(this.userId)) {
      this.router.navigate(['/login']);
    }
    this.getListRoom();
  }

  loadData(event) {
    this.currentPage = event.page + 1;
    this.getListRoom();
  }

  getListRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      user_id: this.userId,
      page: this.currentPage
    };
    this.invoiceService.getListRoom(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
        this.listRoom = res.data;
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

  createInvocie(item) {
    // this.invoiceService.createInvoice({_id: "5fcb67071418a11154ef0d1f"}).subscribe((res: any) => {
    //   console.log(res)
    // })
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.listRoom.length; i++) {
        if (this.listRoom[i]._id === id) {
            index = i;
            break;
        }
    }
    return index;
  }

  invoiceDetail(data) {
    let queryParams = data._id;
    queryParams = queryParams.trim();
    const url = this.router.serializeUrl(this.router.createUrlTree(['/invoice/', queryParams]));
    const myWindow = window.open(url, '', `width=${window.screen.availWidth},height=${window.screen.availHeight}`);
    myWindow.focus();
    const timer = setInterval(checkChild, 500);
    const self = this;
    function checkChild() {
      if (myWindow.closed) {
        const isSaveMatterCar = localStorage.getItem(Constants.SAVE_INVOICE);
        if (isSaveMatterCar !== '') {
          localStorage.removeItem(Constants.SAVE_INVOICE);
          clearInterval(timer);
          self.getListRoom();
        }
      }
    }
  }
}
