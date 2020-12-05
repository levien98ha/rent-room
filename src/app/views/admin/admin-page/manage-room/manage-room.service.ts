import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathAPI } from 'src/app/common/path-api';

@Injectable({
  providedIn: 'root'
})
export class ManageRoomService {

  constructor(private http: HttpClient) { }

  getListRequestByOwner(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_REQUEST_RECEIVE, json);
  }

  getListRequestByUserRent(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_REQUEST_SEND, json);
  }

  accept(json) {
    return this.http.put<any>(PathAPI.PATH_REQUEST, json);
  }
}
