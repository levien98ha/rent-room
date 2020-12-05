import { ProfileAdminService } from './profile-admin.service';
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
import { Constants } from 'src/app/common/constant/Constants';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  downloadURL: Observable<string>;

  submitted: boolean;

  listCity = [];
  listDistrict = [];
  listWard = [];

  // edit
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;

  // create
  selectedCityNew: any;
  selectedDistrictNew: any;
  selectedWardNew: any;

  profile = {
    _id: '',
    user_id: '',
    email: '',
    name: '',
    date_of_birth: '',
    gender: 0,
    city: '',
    district: '',
    ward: '',
    imgUrl: '',
    phonenumber: ''
  };
  name = 'Angular 4';
  url: any;
  gender: number;

  currentPass: string;
  changePass: string;
  verifyPass: string;

  userId: string;
  constructor(
    public profileAdminService: ProfileAdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storage: AngularFireStorage,
    public utilities: Utilities,
    private overlayService: OverlayService
  ) { }

  mess: MessageSystem = new MessageSystem();
  ngOnInit(): void {
    this.getListCity();
    this.userId = JSON.parse(localStorage.getItem('session')).userId;
    this.getProfile();
  }

  async getProfile() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const user = {
      _id: this.userId
    };
    await this.profileAdminService.getProfileUser(user).subscribe(async (res: any) => {
      this.profile = await res.user;
      await this.listCity.map(async (item) => {
        if (item.name.trim() === this.profile.city) {
          this.selectedCity = item;
        }
      });
      this.selectCity();
      this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === res.district);
      this.selectDistrict();
      this.selectedWard = await this.listWard.find(async (item) => item.name === res.ward);
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      const n = Date.now();
      const file = event.target.files[0];
      const filePath = `ImageProfile/${n}`;
      const fileRef = this.storage.ref(filePath);

      const urlCurrent = this.profile.imgUrl;

      const task = this.storage.upload(`ImageProfile/${n}`, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.profile.imgUrl = url;
                this.deleteImage(urlCurrent);
                this.saveProfile();
              }
            });
          })
        )
        .subscribe(url => {
          if (url) {
            this.overlayService.close();
          }
        });
    }
  }

  async deleteImage(data) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
        await this.storage.storage.refFromURL(data.img_url).delete();
        this.overlayService.close();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Deleted', life: 3000});
      }
    });
  }

  saveProfile() {
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    this.profileAdminService.updateProfile(this.profile).subscribe((res: any) => {
      if (res.user) {
        this.overlayService.close();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Edited', life: 3000});
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

  savePass() {
    this.submitted = true;
    if (this.currentPass && this.changePass && this.verifyPass && this.changePass === this.verifyPass) {
      const object = {
        user_id: this.userId,
        current_pass: this.currentPass,
        pass: this.changePass
      };
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      this.profileAdminService.changePass(object).subscribe((res: any) => {
        if (!res.error) {
          this.overlayService.close();
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Update password is successfull.', life: 3000});
        } else {
          this.overlayService.close();
          this.confirmationService.confirm({
            rejectVisible: false,
            acceptLabel: 'OK',
            key: 'err',
            message: this.mess.getMessage('Current password is incorrect.'),
            accept: () => {

            }
          });
        }
      });
    }
  }

  // select radio button
  selectMale(event) {
    this.gender = 1;
  }

  selectFemale(event) {
    this.gender = 0;
  }

  // format address
  formatAddress(city, district, ward) {
    let result = '';
    if (city) {
      result += city;
      if (district) {
        result += ', ' + district;
        if (ward) {
          return result += ', ' + ward;
        } else {
          return result;
        }
      } else {
        if (ward) {
          return result += ward;
        } else {
          return result;
        }
      }
    } else {
      if (district) {
        result += district;
        if (ward) {
          return result += ', ' + ward;
        } else {
          return result;
        }
      } else {
        if (ward) {
          return result += ward;
        } else {
          return result;
        }
      }
    }
  }

  // event
  selectCity() {
    this.listDistrict = [];
    this.listWard = [];
    this.selectedDistrict = null;
    this.selectedWard = null;
    if (this.selectedCity !== null) {
      this.profileAdminService.getDistrict(this.selectedCity?.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
    }
    this.profile.city = this.selectedCity?.name;
  }

  selectDistrict() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrict !== null && this.selectedCity !== null) {
      this.profileAdminService.getWard(this.selectedCity?.id, this.selectedDistrict?.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
      this.profile.district = this.selectedDistrict?.name;
    }
  }

  selectWard() {
    this.profile.ward = this.selectedWard?.name;
  }

  // get city
  getListCity() {
    this.listCity = [];
    this.profileAdminService.getCity().map(item => {
      const city = {id: '', name: ''};
      city.id = item.level1_id;
      city.name = item.name;
      this.listCity.push(city);
    });
  }

  onChangeTime(event: any) {
    const date = new Date(event);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day  = ('0' + date.getDate()).slice(-2);
    const year  = ('0' + date.getFullYear()).slice(-4);
    this.profile.date_of_birth = (day + '/' + month + '/' + year);
  }
}
