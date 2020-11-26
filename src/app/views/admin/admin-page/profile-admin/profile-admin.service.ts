import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dataAddress from '../../../../config/localtion/local.json';
import { PathAPI } from 'src/app/common/path-api';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {

  constructor(private http: HttpClient) { }

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

  getProfileUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }

  updateProfile(json) {
    return this.http.put<any>(PathAPI.PATH_USER_PROFILE, json);
  }

  changePass(json) {
    return this.http.put<any>(PathAPI.PATH_CHANGE_PASS, json);
  }
}
