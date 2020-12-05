import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathAPI } from 'src/app/common/path-api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getListRoom(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_ROOM_UNAVAILABLE, json);
  }
}
