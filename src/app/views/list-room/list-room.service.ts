import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/common/path-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListRoomService {

  constructor(private http: HttpClient) { }

  getListRoom(json) {
    return this.http.post<any>(PathAPI.PATH_ROOM.concat('/search'), json);
  }

  getListRoomSort(json) {
    return this.http.post<any>(PathAPI.PATH_ROOM.concat('/search/sort'), json);
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
