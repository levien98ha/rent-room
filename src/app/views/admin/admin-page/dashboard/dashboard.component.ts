import { Constants } from 'src/app/common/constant/Constants';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  downloadURL: Observable<string>;

  submitted: boolean;

  productDialog: boolean;
  productDialogNew: boolean;

  products: Product[];

  product: Product;

  selectedProducts: any[];

  listCity = [];
  listDistrict = [];
  listWard = [];
  // 'Room', 'House', 'Townhouse', 'Villa'
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

  // edit
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedCategory: any;

  // create
  selectedCityNew: any;
  selectedDistrictNew: any;
  selectedWardNew: any;
  selectedCategoryNew: any;

  selectedFiles: FileList;
  selectedFilesNew: FileList;
  progressInfos = [];
  progressInfosNew = [];
  message = '';

  // fileInfos: Observable<any>;
  fileInfos = [];

  // obj new room
  objNew = {
    title: '',
    category: '',
    photo: [],
    price: 0,
    area: 0,
    time_description: '',
    toilet: '',
    city: '',
    district: '',
    ward: '',
    description: '',
    user_id: ''
  };

  listRoom = [];

  currentPage = 1;
  totalPage = 0;
  totalRecord = 0;

  userId: string;
  mess: MessageSystem = new MessageSystem();
  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storage: AngularFireStorage,
    public utilities: Utilities,
    private overlayService: OverlayService,) { }

  ngOnInit(): void {
    this.dashboardService.getProducts().then(data => this.products = data);
    this.getListCity();
    this.userId = JSON.parse(localStorage.getItem('session')).userId;
    this.getListRoom();
  }

  // get data list room by user id
  async getListRoom() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      user_id: await this.userId,
      page: await this.currentPage
    };
    await this.dashboardService.getListRoom(obj).subscribe(async (res: any) => {
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
        message: this.mess.getMessage('MSE00051'),
        accept: () => {

        }
      });
    });
  }

  async editProduct(product: Product) {
    this.product = {...product};
    this.selectedCategory = this.listCategory.find(item => item.name === product.category);
    this.selectedCity = await this.listCity.find(async (item) => item.name === product.city);
    this.selectCity();
    this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === product.district);
    this.selectDistrict();
    this.selectedWard = await this.listWard.find(async (item) => item.name === product.ward);
    this.productDialog = true;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialogNew = true;
    this.objNew.title = '';
    this.objNew.category = '';
    this.objNew.photo = [];
    this.objNew.price = 0;
    this.objNew.area = 0;
    this.objNew.time_description = '';
    this.objNew.toilet = '';
    this.objNew.city = '';
    this.objNew.district = '';
    this.objNew.ward = '';
    this.objNew.description = '';
    this.objNew.user_id = this.userId;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }

  deleteImage(index, fileName) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + fileName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fileInfos.splice(index, 1);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Deleted', life: 3000});
        }
    });
  }


  // dialog edit
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        } else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }
        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
  }

  // create room
  hideDialogNew() {
    this.productDialogNew = false;
    this.submitted = false;
  }

  async saveProductNew() {
    this.submitted = true;

    if (this.objNew.title.trim() && this.objNew.price && this.objNew.category
        && this.objNew.area && this.objNew.description && this.objNew.city) {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        await this.dashboardService.createNewRoom(this.objNew).subscribe((res: any) => {
          this.overlayService.close();
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          this.productDialogNew = false;
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
        // get lại data table
    }
  }

  changeCategoryNew() {
    this.objNew.category = this.selectedCategoryNew.name;
  }

  // event
  selectCityNew() {
    this.listDistrict = [];
    this.listWard = [];
    this.selectedDistrict = null;
    this.selectedWard = null;
    if (this.selectedCityNew !== null) {
      this.dashboardService.getDistrict(this.selectedCityNew.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
      this.objNew.city = this.selectedCityNew.name;
    }
  }

  selectDistrictNew() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrictNew !== null && this.selectedCityNew !== null) {
      this.dashboardService.getWard(this.selectedCityNew.id, this.selectedDistrictNew.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
      this.objNew.district = this.selectedDistrictNew.name;
    }
  }

  selectWardNew() {
    this.objNew.ward = this.selectedWardNew.name;
  }

  // upload file new
  uploadFilesNew() {
    this.message = '';
    for (let i = 0; i < this.selectedFilesNew.length; i++) {
      this.uploadNew(i, this.selectedFilesNew[i]);
    }
  }

  async uploadNew(idx, fileNew) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.progressInfosNew[idx] = { value: 0, fileName: fileNew.name };
    const n = Date.now();
    const file = fileNew;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);

    this.progressInfosNew[idx].value = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.objNew.photo.push({
                name: fileNew.name,
                img_url: url
              });
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.overlayService.close();
        }
        this.overlayService.close();
      });
  }

  selectFilesNew(event) {
    this.progressInfosNew = [];
    this.selectedFilesNew = event.target.files;
  }

  async deleteImageNew(index, data) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        this.objNew.photo.splice(index, 1);
        await this.storage.storage.refFromURL(data.img_url).delete();
        this.overlayService.close();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Deleted', life: 3000});
      }
    });
  }
  // end create new room

  changeCategory() {

  }
  //
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

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getListCity() {
    this.listCity = [];
    this.dashboardService.getCity().map(item => {
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
      this.dashboardService.getDistrict(this.selectedCity.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
    }
  }

  selectDistrict() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrict !== null && this.selectedCity !== null) {
      this.dashboardService.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
    }
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  delay(amount: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, amount);
    });
  }

  async upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    for (var i = 0; i <= 10; i++) {
      await this.delay(200);
      this.progressInfos[idx].value = Math.round(100 * i / 10);
    }
    this.fileInfos.push({url: 'https://url.image.com', name: `image${idx}`})
  }

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  city?: string;
  district?: string;
  ward?: string;
  price?: number;
  electric_price?: number;
  water_price?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  operator_id?: number;
  area?: number;
}
