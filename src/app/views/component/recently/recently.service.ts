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
}
