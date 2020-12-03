import { Injectable } from '@angular/core';
import { Utilities } from 'src/app/common/utilites';
import { Constants } from 'src/app/common/constant/Constants';
import { ActivatedRoute } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpXsrfTokenExtractor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private route: ActivatedRoute) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const route = this.route.snapshot;
    // this.language = route.data && route.data.language ? route.data.language : Constants.LANGUAGE_EN;
    // let flagwithCredentials = true;
    // flagwithCredentials = !Constants.PUBLIC_API.includes(request.url);
    // request = request.clone({
    //   setHeaders: {
    //     lang: request.headers.get('lang') ?
    //       request.headers.get('lang').toUpperCase() : this.language.toUpperCase(),
    //   },
    //   withCredentials: flagwithCredentials
    // });
     return next.handle(request);
  }
}
