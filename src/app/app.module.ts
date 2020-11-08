import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ModelTypeDirective } from './common/directive/model-type.directive';
import { BtnGroupComponent } from './common/btn-group/btn-group.component';
import { HeaderComponent } from './theme/header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlideShowComponent } from './theme/slide-show/slide-show.component';
import { FooterComponent } from './theme/footer/footer.component';
import { RecentlyComponent } from './views/component/recently/recently.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { IntroductionComponent } from './views/component/introduction/introduction.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListRoomComponent } from './views/list-room/list-room.component';
import { SearchComponent } from './views/component/search/search.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {SliderModule} from 'primeng/slider';
import {GalleriaModule} from 'primeng/galleria';
import { CustomerTellComponent } from './views/component/customer-tell/customer-tell.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { RoomDetailComponent } from './views/room-detail/room-detail.component';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomePageComponent,
    ModelTypeDirective,
    BtnGroupComponent,
    HeaderComponent,
    SlideShowComponent,
    FooterComponent,
    RecentlyComponent,
    IntroductionComponent,
    ListRoomComponent,
    SearchComponent,
    CustomerTellComponent,
    PaginationComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    IvyCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    AccordionModule,
    FormsModule,
    SliderModule,
    ToastModule,
    GalleriaModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    ModelTypeDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
