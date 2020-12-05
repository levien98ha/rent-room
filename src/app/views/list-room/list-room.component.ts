import { ListRoomService } from './list-room.service';
import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../component/search/search.service';
import { LoginService } from 'src/app/views/login/login.service';

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

  listCity = [];
  listDistrict = [];
  listWard = [];
  listCategory = [{
      id: 1,
      name: 'Room'
    },
    {
      id: 2,
      name: 'House'
    },
    {
      id: 3,
      name: 'Townhouse'
    },
    {
      id: 4,
      name: 'Villa'
    }
  ];
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedCategory: any;
  minPrice: string;
  maxPrice: string;
  price = [0, 100000000];
  area = [0, 1000];
  minArea: string;
  maxArea: string;

  sort = [{ id: 1, name: 'Most Relevant' },
  // { id: 2, name: 'Date (Newest - Oldest)' },
  // { id: 3, name: 'Date (Oldest - Newest)' },
  { id: 2, name: 'Price (Lowest - Highest)' },
  { id: 3, name: 'Price (Highest - Lowest)' },
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
    page: 1,
    sort: 'asc'
  };
  constructor(
    private scroll: ViewportScroller,
    private messageService: MessageService,
    public utilities: Utilities,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService,
    private listRoomService: ListRoomService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private loginService: LoginService) {
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
    this.getListCity();
    this.minPrice = this.utilities.formatCurrency(this.price[0]) + ' VNĐ';
    this.maxPrice = this.utilities.formatCurrency(this.price[1]) + ' VNĐ';
    this.minArea = this.utilities.formatCurrency(this.area[0]) + ' m2';
    this.maxArea = this.utilities.formatCurrency(this.area[1]) + ' m2';
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION))?.userId;
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

  async selectSort() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    if (this.selectedSort.id === 1 || this.selectedSort.id === null || this.selectedSort.id === undefined) {
      this.search.page = 1;
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
    } else {
      if (this.selectedSort.id === 2) {
        this.search.sort = 'asc';
      }
      if (this.selectedSort.id === 3) {
        this.search.sort = 'desc';
      }
      this.search.page = 1;
      await this.listRoomService.getListRoomSort(this.search).subscribe((res: any) => {
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
  }

  async searchWithCategory(data) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.search = {
      category: data,
      minArea: 0,
      maxArea: 1000,
      minPrice: 0,
      maxPrice: 100000000,
      city: '',
      district: '',
      ward: '',
      page: 1,
      sort: 'asc'
    };
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

  async searchWithPrice(data) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.search = {
      category: '',
      minArea: 0,
      maxArea: 1000,
      minPrice: data,
      maxPrice: data,
      city: '',
      district: '',
      ward: '',
      page: 1,
      sort: 'asc'
    };
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

  async searchWithCity(data) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.search = {
      category: '',
      minArea: 0,
      maxArea: 1000,
      minPrice: 0,
      maxPrice: 100000000,
      city: data,
      district: '',
      ward: '',
      page: 1,
      sort: 'asc'
    };
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

  resetSearch() {
    this.search = {
      category: '',
      minArea: 0,
      maxArea: 1000,
      minPrice: 0,
      maxPrice: 100000000,
      city: '',
      district: '',
      ward: '',
      page: 1,
      sort: 'asc'
    };
    this.getListCity();
    this.price = [0, 100000000];
    this.area = [0, 1000];
    this.minPrice = this.utilities.formatCurrency(0) + ' VNĐ';
    this.maxPrice = this.utilities.formatCurrency(100000000) + ' VNĐ';
    this.minArea = this.utilities.formatCurrency(0) + ' m2';
    this.maxArea = this.utilities.formatCurrency(1000) + ' m2';
    this.selectedCity = null;
    this.selectedDistrict = null;
    this.selectedWard = null;
    this.selectedCategory = null;
    this.getListRoom();
  }

  getListRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
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

  // search component
  getListCity() {
    this.listCity = [];
    this.searchService.getCity().map(item => {
      const city = {id: '', name: ''};
      city.id = item.level1_id;
      city.name = item.name;
      this.listCity.push(city);
    });
  }

  // event
  selectCity() {
    this.listDistrict = [];
    this.listWard = [];
    this.selectedDistrict = null;
    this.selectedWard = null;
    if (this.selectedCity !== null) {
      this.searchService.getDistrict(this.selectedCity.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
      this.search.city = this.selectedCity?.name;
      this.search.district = '' ;
      this.search.ward = '';
    } else {
      this.search.city = '';
    }
  }

  selectDistrict() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrict !== null && this.selectedCity !== null) {
      this.searchService.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
      this.search.city = this.selectedCity?.name;
      this.search.district = this.selectedDistrict?.name;
      this.search.ward = '';
    } else {
      this.search.district = '';
    }
  }

  selectWard() {
    if (this.selectedWard !== null) {
      this.search.city = this.selectedCity?.name;
      this.search.district = this.selectedDistrict?.name;
      this.search.ward = this.selectedWard?.name;
    } else {
      this.search.ward = '';
    }
  }

  selectCategory() {
    if (this.selectedCategory !== null) {
      this.search.category = this.selectedCategory?.name;
    } else {
      this.search.category = '';
    }
  }

  showValuePrice() {
    this.minPrice = this.utilities.formatCurrency(this.price[0]) + ' VNĐ';
    this.maxPrice = this.utilities.formatCurrency(this.price[1]) + ' VNĐ';
    this.search.minPrice = this.price[0];
    this.search.maxPrice = this.price[1];
  }

  showValueArea() {
    this.minArea = this.utilities.formatCurrency(this.area[0]) + ' m2';
    this.maxArea = this.utilities.formatCurrency(this.area[1]) + ' m2';
    this.search.minArea = this.area[0];
    this.search.maxArea = this.area[1];
  }
}
