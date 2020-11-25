import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as dataAddress from '../../../../config/localtion/local.json';
import { PathAPI } from 'src/app/common/path-api';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  status: string[] = ['AVAILABLE', 'UNAVAILABLE'];

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

  createNewRoom(json) {
    return this.http.post<any>(PathAPI.PATH_ROOM, json);
  }

  updateRoom(json) {
    return this.http.put<any>(PathAPI.PATH_ROOM, json);
  }

  getListRoom(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_ROOM_CUSTOMER, json);
  }

  deleteRoom(json) {
    return this.http.delete<any>(PathAPI.PATH_DELETE_ROOM, json);
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
  area?: number;
}


