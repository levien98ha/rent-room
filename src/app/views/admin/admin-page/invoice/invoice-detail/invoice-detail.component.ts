import { InvoiceDetailService } from './invoice-detail.service';
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
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InvoiceDetailComponent implements OnInit {

  listInvoice = [];
  itemInvoice;

  electric;
  water;
  total;

  mess: MessageSystem = new MessageSystem();
  constructor(
    private invoiceDetailService: InvoiceDetailService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private router: Router,
  ) { }

  idRoom;
  ngOnInit(): void {
    const url = window.location.href;
    this.idRoom = url.slice(url.lastIndexOf('/') + 1, url.length);
    this.getListInvoice(this.idRoom);
  }

  getListInvoice(id: string) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      roomId: this.idRoom
    };
    this.invoiceDetailService.getListInvoiceById(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.listInvoice = res.data;
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

  selecteItem(data) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      _id: data._id
    };
    this.invoiceDetailService.getDataInvoice(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.itemInvoice = res.data[0];
        this.electric = this.itemInvoice.electric_last - this.itemInvoice.electric_before;
        this.water = this.itemInvoice.water_last - this.itemInvoice.water_before;
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

  saveInvoice() {
    localStorage.setItem(Constants.SAVE_INVOICE, 'true');
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

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }
}
