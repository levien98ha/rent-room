import { CreateInvoiceService } from './create-invoice.service';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constant/Constants';
import { Utilities } from 'src/app/common/utilites';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { ConfirmationService } from 'primeng/api';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CreateInvoiceComponent implements OnInit {

  listInvoice = [];
  itemInvoice = {
    _id: '',
    title: '',
    user_id: '',
    user_rent: '',
    room_id: '',
    date_start: '',
    date_end: '',
    electric_before: undefined,
    electric_last: undefined,
    water_before: undefined,
    water_last: undefined,
    total: undefined
  };

  electric;
  water;
  total;
  totalElectric;
  totalWater;

  messageErr = {
    electric_before: '',
    electric_after: '',
    water_before: '',
    water_after: '',
    date_start: '',
    date_end: ''
  };
  selectCheck = false;
  mess: MessageSystem = new MessageSystem();
  constructor(
    private createInvoiceService: CreateInvoiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private router: Router,
  ) { }

  idRoom;
  room;
  checkNew = true;
  profile;
  ngOnInit(): void {
    const url = window.location.href;
    this.idRoom = url.slice(url.lastIndexOf('/') + 1, url.length);
    this.getDetailRoom();
  }

  async getDetailRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      _id: this.idRoom
    };

    await this.createInvoiceService.getRoomById(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.room = res.data[0];
        this.itemInvoice.room_id = this.idRoom;
        this.itemInvoice.user_id = res.data[0].user_id;
        this.itemInvoice.user_rent = res.data[0].user_rent;
        const user = {
          _id: res.data[0].user_rent
        };
        await this.createInvoiceService.getProfileUser(user).subscribe(async (response: any) => {
          this.profile = await response.user;
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

  createInvoice() {
    if (this.messageErr.electric_after === '' && this.messageErr.electric_before === ''
      && this.messageErr.water_after === '' && this.messageErr.water_before === ''
      && this.messageErr.date_end === '' && this.messageErr.date_start === '') {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      this.createInvoiceService.createInvocie(this.itemInvoice).subscribe((res: any) => {
        this.overlayService.close();
        localStorage.setItem(Constants.SAVE_INVOICE, 'true');
        this.itemInvoice = res.data[0];
        this.checkNew = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Update succesfull', life: 3000 });
      }, (error) => {
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
    } else {
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        key: 'err',
        message: this.mess.getMessage('Validate field is error. Please check again.'),
        accept: () => {

        }
      });
    }
  }

  saveInvoice() {
    if (this.messageErr.electric_after === '' && this.messageErr.electric_before === ''
      && this.messageErr.water_after === '' && this.messageErr.water_before === ''
      && this.messageErr.date_end === '' && this.messageErr.date_start === '') {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      this.createInvoiceService.saveInvocie(this.itemInvoice).subscribe((res: any) => {
        this.overlayService.close();
        localStorage.setItem(Constants.SAVE_INVOICE, 'true');
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Update succesfull', life: 3000 });
      }, (error) => {
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
    } else {
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        key: 'err',
        message: this.mess.getMessage('Validate field is error. Please check again.'),
        accept: () => {

        }
      });
    }
  }

  closeWindow() {
    this.confirmationService.confirm({
      header: this.mess.getMessage('MSW00010'),
      key: 'info',
      acceptLabel: 'Yes',
      message: this.mess.getMessage('MSE00051'),
      accept: () => {
        window.close();
      }
    });
  }

  // download pdf
  exportAsPDF(div: any) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const data = document.getElementById(div);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4'); // Generates PDF in landscape mode
      // const pdf = new jspdf('p', 'cm', 'a4'); // Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);

      pdf.save('Filename.pdf');
      this.overlayService.close();
    });
  }

  changeTitle(event) {
    this.itemInvoice.title = event.currentTarget.innerHTML;
  }

  checkFormatDateStart(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.date_start = '';
    if (this.utilities.formatDateDDMMYYY(strDate)) {
      this.itemInvoice.date_start = strDate;
    } else {
      this.messageErr.date_start = this.mess.getMessage('MSE00019', 'Date Start');
    }

  }

  checkFormatDateEnd(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.date_end = '';
    if (this.utilities.formatDateDDMMYYY(strDate)) {
      this.itemInvoice.date_end = strDate;
    } else {
      this.messageErr.date_end = this.mess.getMessage('MSE00019', 'Date End');
    }

  }

  validateWaterBefore(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.water_before = '';
    if (!this.utilities.isEmptyString(strDate.toString())) {
      if (this.utilities.isNumber(strDate)) {
        this.itemInvoice.water_before = Number(strDate);
        if (this.itemInvoice.water_before > this.itemInvoice.water_last && this.utilities.isNumber(this.itemInvoice.water_last)) {
          this.messageErr.water_before = this.mess.getMessage('MSE00018', 'Number Water Before', 'Number Water After');
        } else {
          this.calcTotal();
        }
      } else {
        this.messageErr.water_before = this.mess.getMessage('MSE00020', 'Number Water Before');
      }
    } else {
      this.messageErr.water_before = this.mess.getMessage('MSE00001', 'Number Water Before');
    }
  }

  validateWaterLast(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.water_after = '';
    if (!this.utilities.isEmptyString(strDate.toString())) {
      if (this.utilities.isNumber(strDate)) {
        this.itemInvoice.water_last = Number(strDate);
        if (this.itemInvoice.water_before > this.itemInvoice.water_last && this.utilities.isNumber(this.itemInvoice.water_before)) {
          this.messageErr.water_after = this.mess.getMessage('MSE00016', 'Number Water After', 'Number Water Before');
        } else {
          this.calcTotal();
        }
      } else {
        this.messageErr.water_after = this.mess.getMessage('MSE00020', 'Number Water After');
      }
    } else {
      this.messageErr.water_before = this.mess.getMessage('MSE00001', 'Number Water After');
    }
  }

  validateElectricBefore(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.electric_before = '';
    if (!this.utilities.isEmptyString(strDate.toString())) {
      if (this.utilities.isNumber(strDate)) {
        this.itemInvoice.electric_before = Number(strDate);
        if (this.itemInvoice.electric_before > this.itemInvoice.electric_last
          && this.utilities.isNumber(this.itemInvoice.electric_last)) {
          this.messageErr.electric_before = this.mess.getMessage('MSE00016', 'Number Electric Before', 'Number Electric After');
        } else {
          this.calcTotal();
        }
      } else {
        this.messageErr.electric_before = this.mess.getMessage('MSE00020', 'Number Electric Before');
      }
    } else {
      this.messageErr.electric_before = this.mess.getMessage('MSE00001', 'Number Electric Before');
    }
  }

  validateElectricLast(event) {
    const strDate = event.currentTarget.innerHTML;
    this.messageErr.electric_after = '';
    if (!this.utilities.isEmptyString(strDate.toString())) {
      if (this.utilities.isNumber(strDate)) {
        this.itemInvoice.electric_last = Number(strDate);
        if (this.itemInvoice.electric_before > this.itemInvoice.electric_last
          && this.utilities.isNumber(this.itemInvoice.electric_before)) {
          this.messageErr.electric_after = this.mess.getMessage('MSE00016', 'Number Electric After', 'Number Electric Before');
        } else {
          this.calcTotal();
        }
      } else {
        this.messageErr.electric_after = this.mess.getMessage('MSE00020', 'Number Electric Before');
      }
    } else {
      this.messageErr.electric_after = this.mess.getMessage('MSE00001', 'Number Electric Before');
    }
  }

  calcTotal() {
    if (this.messageErr.electric_after === '' && this.messageErr.electric_before === ''
      && this.messageErr.water_after === '' && this.messageErr.water_before === '') {
      this.totalElectric = this.calcElectricPrice(this.itemInvoice.electric_before, this.itemInvoice.electric_last).toFixed();
      this.totalWater = this.calcWaterPrice(this.itemInvoice.water_before, this.itemInvoice.water_last).toFixed();
      this.itemInvoice.total = Number(this.totalElectric) + Number(this.totalWater) + Number(this.room.price);
    }
  }

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }

  calcElectricPrice(number1, number2) {
    let total = 0;
    const el = number2 - number1;
    if (el <= 50) {
      total = el * 1678;
    } else if (50 < el && el <= 100) {
      total = 50 * 1678 + (el - 50) * 1734;
    } else if (100 < el && el <= 200) {
      total = 50 * 1678 + 50 * 1734 + (el - 100) * 2014;
    } else if (200 < el && el <= 300) {
      total = 50 * 1678 + 50 * 1734 + 100 * 2014 + (el - 200) * 2536;
    } else if (300 < el && el <= 400) {
      total = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + (el - 300) * 2834;
    } else if (400 < el) {
      total = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + 100 * 2834 + (el - 400) * 2927;
    }
    total += total * 10 / 100;
    return total;
  }

  calcWaterPrice(number1, number2) {
    const wt = number2 - number1;
    let total = 0;
    if (wt <= 10) {
      total = wt * 6869;
    }
    if (10 < wt && wt <= 20) {
      total = 10 * 6869 + (wt - 10) * 8110;
    }
    if (20 < wt && wt <= 30) {
      total = 10 * 6869 + 10 * 8110 + (wt - 20) * 9969;
    }
    if (30 < wt) {
      total = 10 * 6869 + 10 * 8110 + 10 * 9969 + (wt - 30) * 18318;
    }
    return total;
  }
}
