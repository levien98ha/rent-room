import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OverlayService } from '../overlay/overlay.service';
import { Utilities } from '../utilites';
import { Constants } from './../constant/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // tslint:disable-next-line:ban-types
    private overLay: OverlayService,
    private util: Utilities,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        const user = JSON.parse(localStorage.getItem(Constants.SESSION));
        if (!user) {
          this.router.navigate([Constants.PATH_LOGIN]);
          // this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
          this.overLay.close();
          return true;
        }
        const role = user.role;
        switch (role) {
          case Constants.ADMIN:
            if (this.checkAccessScreen(route.routeConfig.path, state.url, Constants.PATHS_ACCESS_OPERATOR)) {
              this.router.navigate([Constants.PATH_ADMIN_MYPAGE]);
            }
            break;
          case Constants.OPERATOR:
            if (this.checkAccessScreen(route.routeConfig.path, state.url, Constants.PATHS_ACCESS_OPERATOR)) {
              this.router.navigate([Constants.PATH_OPERATOR_MYPAGE]);
            }
            break;
          case Constants.USER:
            if (this.checkAccessScreen(route.routeConfig.path, state.url, Constants.PATHS_ACCESS_END_USER)) {
              this.overLay.close();
              this.router.navigate([Constants.PATH_USER_MYPAGE]);
            }
            break;
        }
        return true;
      } catch (error) {
        localStorage.removeItem(Constants.SESSION);
        this.router.navigate([Constants.PATH_LOGIN], { queryParams: { returnUrl: state.url } });
        this.overLay.close();
        return false;
      }
    }

  checkAccessScreen(path, url, pathAccess) {
    return !pathAccess.find(item => (item.substr(1) === path || item === url));
  }

}
