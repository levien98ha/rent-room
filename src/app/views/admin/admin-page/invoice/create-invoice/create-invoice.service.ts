import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathAPI } from 'src/app/common/path-api';

@Injectable({
  providedIn: 'root'
})
export class CreateInvoiceService {

  constructor(private http: HttpClient) { }

  getListInvoiceById(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_INVOCIE, json);
  }

  getDataInvoice(json) {
    return this.http.post<any>(PathAPI.PATH_INVOICE_ID, json);
  }

  saveInvocie(json) {
    return this.http.put<any>(PathAPI.PATH_INVOICE, json);
  }

  createInvocie(json) {
    return this.http.post<any>(PathAPI.PATH_INVOICE, json);
  }

  getRoomById(json) {
    return this.http.post<any>(PathAPI.PATH_ROOM_ID, json);
  }

  getProfileUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }
}
