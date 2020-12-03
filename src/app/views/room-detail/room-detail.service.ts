import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/common/path-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailService {

  constructor(private http: HttpClient) { }

  getRoomById(json) {
    return this.http.post<any>(PathAPI.PATH_ROOM_ID, json);
  }

  getProfileUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }
}
