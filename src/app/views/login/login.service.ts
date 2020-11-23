import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/common/path-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(json) {
    return this.http.post<any>(PathAPI.PATH_LOG_IN, json);
  }

  resetPass(json) {
    return this.http.post<any>(PathAPI.PATH_RESET_PASSWORD, json);
  }

  registerUser(json) {
    return this.http.post<any>(PathAPI.PATH_USERS, json);
  }
}
