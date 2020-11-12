import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as dataAddress from '../../../../config/localtion/local.json';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>('assets/user.json')
    .toPromise()
    .then(res => <User[]>res.data)
    .then(data => { return data; });
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
