import { AdminPageComponent } from './views/admin/admin-page/admin-page.component';
import { RoomDetailComponent } from './views/room-detail/room-detail.component';
import { ListRoomComponent } from './views/list-room/list-room.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'room',
    component: ListRoomComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'room/:id',
    component: RoomDetailComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'manage',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
