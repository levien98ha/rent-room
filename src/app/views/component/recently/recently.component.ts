import { RecentlyService } from './recently.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Utilities } from 'src/app/common/utilites';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';

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

  listRecently = [];
  constructor(
    private messageService: MessageService,
    private recentlyService: RecentlyService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService
    ) { }

  mess: MessageSystem = new MessageSystem();
  ngOnInit(): void {
    this.getRoom();
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Mark room is successful.' });
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
}
