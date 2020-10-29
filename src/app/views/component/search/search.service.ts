import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as data from '../../../config/localtion/local.json';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getCity() {
    return (data as any).default.data;
  }

  getDistrict(id: string) {
    return (data as any).default.data.filter(item => item.level1_id === id);
  }

  getWard(idCity: string, idDistrict: string) {
    const arr = [];
    (data as any).default.data.map(itemLv1 => {
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
