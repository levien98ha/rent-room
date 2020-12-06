import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/common/path-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getMarkRoomUser(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_MARK.concat('/all'), json);
  }

  getMarkRoom(json) {
    return this.http.post<any>(PathAPI.PATH_LIST_MARK, json);
  }

  markRoom(json) {
    return this.http.post<any>(PathAPI.PATH_MARK, json);
  }

  deleteMark(json) {
    return this.http.post<any>(PathAPI.PATH_MARK.concat('/del'), json);
  }
}
