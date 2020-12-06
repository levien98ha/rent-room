import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/common/path-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequesstSendService {

  constructor(private http: HttpClient) { }

  getListRequest(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_REQUEST_SEND, json);
  }

  changeStatus(json) {
    return this.http.put<any>(PathAPI.PATH_REQUEST, json);
  }
}
