import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathAPI } from 'src/app/common/path-api';
@Injectable({
  providedIn: 'root'
})
export class RecentlyService {

  constructor(private http: HttpClient) { }

  getRecentlyRoom() {
    return this.http.post<any>(PathAPI.PATH_RECENTLY_ROOM, '');
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
