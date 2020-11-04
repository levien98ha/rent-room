import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalRecord = 0;
  @Input() currentPage;
  @Input() totalPage = 0;
  @Input() noRecordInPage = 0;
  @Input() showPagging = true;
  @Input() recordEnd = 0;
  @Input() detailShow = false;
  @Output() currentPageChange: EventEmitter<any> = new EventEmitter<any>();
  isShowPaggingPage = false;
  records = 0;
  listNumberPage = [];
  rangerPageStart = 0;
  rangerPageEnd = 0;
  recordStart = 0;
  recordInPage = 0;
  pageSelect = 1;
  RECORD_IN_PAGE = 10;
  constructor() {
    this.recordInPage = this.RECORD_IN_PAGE;
  }

  ngOnChanges(){
    this.totalPage = Math.ceil(this.totalRecord / this.RECORD_IN_PAGE);
    this.getListPage(true);
  }

  ngOnInit(){
    this.totalPage = Math.ceil(this.totalRecord / this.recordInPage);
    this.pageSelect = this.currentPage;
    this.getListPage(true);
  }

  selectPage(page) {
    if (!this.detailShow) {
      this.currentPage = page;
    }
    this.pageSelect = page;
    this.getListPage(true);
    this.outputEvent();
  }

  nextPage() {
    if (this.detailShow) {
      this.pageSelect = this.currentPage + 1;
    } else {
      this.pageSelect = ++this.currentPage;
    }
    this.getListPage(true);
    this.outputEvent();
  }

  backPage() {
    if (this.detailShow) {
      this.pageSelect = this.currentPage - 1;
    } else {
      this.pageSelect = --this.currentPage;
    }
    this.getListPage(true);
    this.outputEvent();

  }

  firstPage() {
    if (!this.detailShow) {
      this.currentPage = 1;
    }
    this.pageSelect = 1;
    this.getListPage(true);
    this.outputEvent();
  }

  lastPage() {
    if (!this.detailShow) {
      this.currentPage = this.totalPage;
    }
    this.pageSelect = this.totalPage;
    this.getListPage(true);
    this.outputEvent();
  }

  getListPage(appendRanger) {
    if (appendRanger) {
      this.rangerPageEnd = this.currentPage + 4 >= this.totalPage ? this.totalPage : this.currentPage + 4;
      this.rangerPageStart = this.rangerPageEnd - 4 <= 0 ? 1 : this.rangerPageEnd - 4;
    }

    this.listNumberPage = [];

    for (let i = this.rangerPageStart; i <= this.rangerPageEnd; i++) {
      this.listNumberPage.push(i);
    }
    this.recordStart = (this.currentPage - 1) * this.recordInPage + 1;
    if (this.showPagging) {
      this.recordEnd = (this.recordStart + this.recordInPage - 1) >
        this.totalRecord ? this.totalRecord : this.recordStart + this.recordInPage - 1;
    }
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    return this.currentPage === this.totalPage;
  }

  outputEvent() {
    window.scroll(0, 0);
    this.currentPageChange.emit({
      currentPage: this.currentPage,
      selectPage: this.pageSelect
    });
  }

}
