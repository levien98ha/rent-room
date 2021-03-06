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

  getRoomSame(json) {
    return this.http.post<any>(PathAPI.PATH_SEARCH_SAME_ROOM, json);
  }

  getProfileUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }

  createRequest(json) {
    return this.http.post<any>(PathAPI.PATH_REQUEST, json);
  }

  getListRequestUser(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_REQUEST_USER, json);
  }

  getMarkRoom(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_MARK.concat('/all'), json);
  }

  markRoom(json) {
    return this.http.post<any>(PathAPI.PATH_MARK, json);
  }

  deleteMark(json) {
    return this.http.post<any>(PathAPI.PATH_MARK.concat('/del'), json);
  }
}
