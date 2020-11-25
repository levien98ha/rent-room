import { Constants } from 'src/app/common/constant/Constants';
import { DashboardService } from './dashboard.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  @ViewChild('imageEdit') imageEdit: ElementRef;

  downloadURL: Observable<string>;

  submitted: boolean;

  productDialog: boolean;
  productDialogNew: boolean;

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
    id: '',
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
    user_id: '',
    user_rent: '',
    status: ''
  };

  listRoom = [];

  currentPage = 1;
  totalPage = 0;
  totalRecord = 0;

  statusRoom = [{name: 'AVAILABLE'}, {name: 'UNAVAILABLE'}];
  selectedStatus: any;
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
    // this.dashboardService.getProducts().then(data => this.products = data);
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
        key: 'err',
        message: this.mess.getMessage('MSE00051'),
        accept: () => {

        }
      });
    });
  }

  // click edit room
  async editProduct(product: any) {
    this.progressInfos = [];
    this.selectedFiles = null;
    await this.statusRoom.map(async (item) => {
      if (item.name === product.status) {
        this.selectedStatus = item;
      }
    });
    this.objNew = {...product};
    this.selectedCategory = this.listCategory.find(item => item.name === product.category);
    await this.listCity.map(async (item) => {
      if (item.name.trim() === product.city.trim()) {
        this.selectedCity = item;
      }
    });
    this.selectCity();
    this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === product.district);
    this.selectDistrict();
    this.selectedWard = await this.listWard.find(async (item) => item.name === product.ward);
    this.fileInfos = product.photo;
    this.productDialog = true;
  }

  openNew() {
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

  deleteProduct(product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
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

  // save edit room
  saveProduct(data) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.dashboardService.updateRoom(data).subscribe(async (res: any) => {
      this.overlayService.close();
      this.hideDialog();
      await this.getListRoom();
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Edited', life: 3000});
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        message: this.mess.getMessage('MSE00051'),
        header: 'Error',
        key: 'err',
        rejectVisible: false,
        acceptLabel: 'OK',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

        }
      });
    });
  }

  // create room
  hideDialogNew() {
    this.productDialogNew = false;
    this.submitted = false;
  }

  // save new room
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

  changeStatus() {
    this.objNew.status = this.selectedStatus.name;
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
    this.imageEdit.nativeElement.value = '';
  }

  async uploadNew(idx, fileNew) {
    this.progressInfosNew[idx] = { value: 0, fileName: fileNew.name };
    const n = Date.now();
    const file = fileNew;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);

    this.progressInfos[idx].value = ((await task).bytesTransferred / (await task).totalBytes) * 100;

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
        }
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
    this.objNew.category = this.selectedCategory.name;
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
    const temp = 10 - this.fileInfos.length;
    if (event.target.files.length < temp) {
      this.selectedFiles = event.target.files;
    } else {
      this.confirmationService.confirm({
        message: 'You can only select up to 6 files.',
        header: 'Warning',
        key: 'err',
        icon: 'pi pi-exclamation-triangle',
        rejectVisible: false,
        accept: async () => {
          this.imageEdit.nativeElement.value = '';
        }
      });
    }
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    this.imageEdit.nativeElement.value = '';
  }

  async upload(idx, fileEdit) {
    this.progressInfos[idx] = { value: 0, fileName: fileEdit.name };
    const n = Date.now();
    const file = fileEdit;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);

    this.progressInfos[idx].value = ((await task).bytesTransferred / (await task).totalBytes) * 100;

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.objNew.photo.push({
                name: fileEdit.name,
                img_url: url
              });
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }
}
