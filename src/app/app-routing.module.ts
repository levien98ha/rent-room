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
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: ListRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room/:id',
    component: RoomDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
