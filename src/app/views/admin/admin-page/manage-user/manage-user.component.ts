import { ManageUserService } from './manage-user.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ManageUserComponent implements OnInit {

  submitted: boolean;

  userDialog: boolean;

  users: User[];

  user: User;

  selectedUsers: User[];

  listCity = [];
  listDistrict = [];
  listWard = [];
  // 'Room', 'House', 'Townhouse', 'Villa'
  listCategory = [{
      id: 0,
      name: 'User'
    },
    {
      id: 1,
      name: 'Operator'
    }
  ];
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedCategory: any;

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  constructor(
    private manageUserService: ManageUserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.manageUserService.getUsers().then(data => this.users = data);
    this.getListCity();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }

  async editUser(user: User) {
    this.user = {...user};
    this.selectedCategory = this.listCategory.find(item => item.id === user.role);
    this.selectedCity = await this.listCity.find(async (item) => item.name === user.city);
    this.selectCity();
    this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === user.district);
    this.selectDistrict();
    this.selectedWard = await this.listWard.find(async (item) => item.name === user.ward);
    this.userDialog = true;
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + user.id + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.id !== user.id);
            this.user = {};
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });
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
    if (this.selectedCity !== null) {
      this.manageUserService.getDistrict(this.selectedCity.id).map(itemLv1 => {
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
      this.manageUserService.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
    }
  }
}

export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  city?: string;
  district?: string;
  ward?: string;
  role?: number;
}
