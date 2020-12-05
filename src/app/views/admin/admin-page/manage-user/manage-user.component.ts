import { ManageUserService } from './manage-user.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { ViewChild } from '@angular/core';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Utilities } from 'src/app/common/utilites';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/common/constant/Constants';
import { ProfileAdminService } from '../profile-admin/profile-admin.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ManageUserComponent implements OnInit {
  @ViewChild('imageEdit') imageEdit: ElementRef;

  downloadURL: Observable<string>;

  submitted: boolean;

  userDialog: boolean;
  userDialogNew: boolean;

  isNew: boolean;
  selectedUsers: any[];

  listCity = [];
  listDistrict = [];
  listWard = [];

  listRole = [{
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'operator'
    },
    {
      id: 3,
      name: 'user'
    }
  ];

  // edit
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedRole: any;

  // create
  selectedCityNew: any;
  selectedDistrictNew: any;
  selectedWardNew: any;
  selectedRoleNew: any;

  selectedFiles: File;
  selectedFilesNew: File;
  progressInfos: any;
  progressInfosNew: any;
  message = '';

  // fileInfos: Observable<any>;
  fileInfos;

  // obj new room
  objNew = {
    _id: '',
    name: '',
    email: '',
    role: '',
    date_of_birth: '',
    city: '',
    district: '',
    ward: '',
    gender: undefined,
    imgUrl: '',
    phonenumber: ''
  };

  listUser = [];

  currentPage = 1;
  totalPage = 0;
  totalRecord = 0;

  selectedStatus: any;
  userId: string;
  mess: MessageSystem = new MessageSystem();
  constructor(
    public profileAdminService: ProfileAdminService,
    private manageUserService: ManageUserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storage: AngularFireStorage,
    public utilities: Utilities,
    private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.getListCity();
    this.userId = JSON.parse(localStorage.getItem('session')).userId;
    this.getListUsers(this.currentPage);
  }

  // get data list room by user id
  async getListUsers(index: number) {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const obj = {
      user_id: await this.userId,
      page: index
    };
    await this.manageUserService.getListUsers(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.totalPage = res.pageSize;
        this.totalRecord = res.total;
        this.listUser = res.data;
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

  selectRole() {
    this.objNew.role = this.selectedRole.name;
  }

  // click edit room
  async editUser(user: any) {
    this.progressInfos = [];
    this.selectedFiles = null;
    this.isNew = false;
    this.objNew = user;
    this.selectedRole = this.listRole.find(item => item.name === user.role);
    console.log(user)
    await this.listCity.map(async (item) => {
      if (item.name.trim() === user.city.trim()) {
        this.selectedCity = item;
        this.selectCity();
        this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === user.district);
        this.selectDistrict();
        this.selectedWard = await this.listWard.find(async (item) => item.name === user.ward);
      }
    });
    this.fileInfos = user.imgUrl;
    this.userDialog = true;
  }

  async deleteUser(user) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete user ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const obj = {
            _id: user._id
          };

          this.manageUserService.deleteUser(obj).subscribe(async (res: any) => {
            if (!res.Error) {
              await this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              this.getListUsers(this.currentPage);
            } else {
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
            }
          });
        }
    });
  }

  createUser() {
    this.submitted = true;
    if (this.objNew.role) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      let obj = {
        name: this.objNew.name,
        email: this.objNew.email,
        role: this.objNew.role,
        date_of_birth: this.objNew.date_of_birth,
        city: this.objNew.city,
        district: this.objNew.district,
        ward: this.objNew.ward,
        gender: this.objNew.gender? 1 : 0,
        imgUrl: '',
        phonenumber: this.objNew.phonenumber
      };
      this.manageUserService.createUser(this.objNew).subscribe((res: any) => {
        if (res.user) {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Created', life: 3000});
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
  }

  saveUser() {
    this.submitted = true;
    if (this.objNew.name && this.objNew.gender !== undefined && this.objNew.role && this.objNew.city) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      this.profileAdminService.updateProfile(this.objNew).subscribe((res: any) => {
        if (res.user) {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Edited', life: 3000});
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
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  openNew() {
    this.isNew = true;
    this.progressInfos = [];
    this.userDialog = true;
    this.selectedRole = null;
    this.selectedCity = null;
    this.selectedDistrict = null;
    this.selectedWard = null;
    this.objNew.name = '';
    this.objNew.email = '';
    this.objNew.role = '';
    this.objNew.date_of_birth = '';
    this.objNew.city = '';
    this.objNew.district = '';
    this.objNew.ward = '';
    this.objNew.gender = '';
    this.objNew.imgUrl = '';
    this.objNew.phonenumber = '';
    this.objNew._id = this.userId;
  }

  getListCity() {
    this.listCity = [];
    this.manageUserService.getCity().map(item => {
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
    if (this.selectedCity !== null && this.selectedCity !== '') {
      this.manageUserService.getDistrict(this.selectedCity?.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
      this.objNew.city = this.selectedCity.name;
    }
  }

  selectDistrict() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrict !== null && this.selectedCity !== null) {
      this.manageUserService.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
      this.objNew.district = this.selectedDistrict.name;
    }
  }

  selectWard() {
    this.objNew.ward = this.selectedWard.name;
  }

  // select radio button
  selectMale(event) {
  this.objNew.gender = 1;
  }

  selectFemale(event) {
    this.objNew.gender = 0;
  }

  async deleteImage(index, fileName) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + fileName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fileInfos.splice(index, 1);
          this.storage.storage.refFromURL(fileName).delete();
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Deleted', life: 3000});
        }
    });
  }

  // dialog edit
  hideDialog() {
    this.userDialog = false;
    this.refresh();
    this.getListUsers(this.currentPage);
  }

  refresh() {
    this.submitted = false;
    this.progressInfos = [];
    this.selectedRole = null;
    this.selectedCity = null;
    this.selectedDistrict = null;
    this.selectedWard = null;
    this.objNew.name = '';
    this.objNew.email = '';
    this.objNew.role = '';
    this.objNew.date_of_birth = '';
    this.objNew.city = '';
    this.objNew.district = '';
    this.objNew.ward = '';
    this.objNew.gender = '';
    this.objNew.imgUrl = '';
    this.objNew.phonenumber = '';
    this.objNew._id = this.userId;
  }
  // change page
  loadData(event) {
    this.currentPage = event.page + 1;
    this.getListUsers(this.currentPage);
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

  capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  onChangeTime(event: any) {
    const date = new Date(event);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day  = ('0' + date.getDate()).slice(-2);
    const year  = ('0' + date.getFullYear()).slice(-4);
    this.objNew.date_of_birth = (day + '/' + month + '/' + year);
  }

  onChangeTime2(event: any) {
    console.log(event.currentTarget.innerHTML)
  }
}
