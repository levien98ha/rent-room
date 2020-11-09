import { AdminPageComponent } from './views/admin/admin-page/admin-page.component';
import { RoomDetailComponent } from './views/room-detail/room-detail.component';
import { ListRoomComponent } from './views/list-room/list-room.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'room',
    component: ListRoomComponent
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
    path: 'admin',
    component: AdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
