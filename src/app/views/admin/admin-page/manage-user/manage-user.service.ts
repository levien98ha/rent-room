import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as dataAddress from '../../../../config/localtion/local.json';
import { PathAPI } from 'src/app/common/path-api';
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) { }

  getListUsers(json) {
    return this.http.get<any>(PathAPI.PATH_LIST_USER, json);
  }

  deleteUser(json) {
    return this.http.post<any>(PathAPI.PATH_DELETE_USER, json);
  }

  updateUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }

  createUser(json) {
    return this.http.post<any>(PathAPI.PATH_CREATE_USER_ADMIN, json);
  }

  getCity() {
    return (dataAddress as any).default.data;
  }

  getDistrict(id: string) {
    return (dataAddress as any).default.data.filter(item => item.level1_id === id);
  }

  getWard(idCity: string, idDistrict: string) {
    const arr = [];
    (dataAddress as any).default.data.map(itemLv1 => {
      if (itemLv1.level1_id === idCity) {
        itemLv1.level2s.map(item => {
          if (item.level2_id === idDistrict) {
            arr.push(item.level3s);
          }
        });
      }
    });
    return arr;
  }
}

