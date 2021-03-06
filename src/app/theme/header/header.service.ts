import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathAPI } from 'src/app/common/path-api';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getProfileUser(json) {
    return this.http.post<any>(PathAPI.PATH_USER_PROFILE, json);
  }
}
