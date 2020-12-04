import { RoomDetailService } from './room-detail.service';
import { Component, HostListener, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Galleria } from 'primeng/galleria';
import { Utilities } from '../../common/utilites';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { Constants } from 'src/app/common/constant/Constants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
  providers: [MessageService]
})
export class RoomDetailComponent implements OnInit {

  pageYoffset = 100;
  shareLink = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F';
  currentUrl = '';
  showThumbnails: boolean;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  profile;
  userId;
  room;
  roomClone = [];
  checkRequest = true;
  @ViewChild('galleria') galleria: Galleria;

  mess: MessageSystem = new MessageSystem();
  constructor(
    private route: ActivatedRoute,
    private roomDetailService: RoomDetailService,
    private scroll: ViewportScroller,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private utilities: Utilities,
    private router: Router,
    private confirmationService: ConfirmationService,
    private overlayService: OverlayService) { }

  async ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem(Constants.SESSION)).userId;
    this.route.paramMap.subscribe(params => {
      this.getDetailRoom();
    });
    this.currentUrl = this.router.url;
    this.shareLink += 'www.fb.com';
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  scrollTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }
    this.cd.detach();
  }

  openPreviewFullScreen() {
    const elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) { /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) { /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    } else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    } else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
    this.onFullScreenListener = null;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }

  shareLinkClick() {
    window.open(this.shareLink);
  }

  copyText() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  async getDetailRoom() {
    this.checkRequest = true;
    this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
    const url = window.location.href;
    const idRoom = url.slice(url.lastIndexOf('/') + 1, url.length);
    const obj = {
      _id: idRoom
    };

    if (this.userId) {
      const objUser = {
        _id: idRoom,
        user_rent: this.userId
      };
      await this.roomDetailService.getListRequestUser(objUser).subscribe((res: any) => {
        if (res.data.length !== 0) {
          // res.data.request.map(item => {
          //   if (item.room_id === idRoom) {
          this.checkRequest = false;
          //   }
          // });
        }
      });
    }

    await this.roomDetailService.getRoomById(obj).subscribe(async (res: any) => {
      if (res.data) {
        this.room = res.data[0];
        const user = {
          _id: res.data[0].user_id
        };
        await this.roomDetailService.getProfileUser(user).subscribe((response: any) => {
          this.profile = response.user;
        });
        this.bindDocumentListeners();
        const same = {
          _id: res.data[0]._id,
          category: res.data[0].category,
          userId: res.data[0].user_id
        };
        await this.roomDetailService.getRoomSame(same).subscribe((response: any) => {
          this.roomClone = response.data;
        });
        this.overlayService.close();
      }
    }, (err) => {
      this.overlayService.close();
      this.confirmationService.confirm({
        rejectVisible: false,
        acceptLabel: 'OK',
        message: this.mess.getMessage('Room', 'MSE00028'),
        accept: () => {

        }
      });
    });
  }

  newRequest() {
    if (this.userId) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      const obj = {
        userOwner: this.room.user_id,
        userRent: this.userId,
        roomId: this.room._id
      };
      this.roomDetailService.createRequest(obj).subscribe(async (res: any) => {
        if (res.data) {
          await this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Request successfull.', life: 3000});
          this.overlayService.close();
        }
      }, (err) => {
        this.overlayService.close();
        this.confirmationService.confirm({
          rejectVisible: false,
          acceptLabel: 'OK',
          message: this.mess.getMessage('Room', 'MSE00028'),
          accept: () => {

          }
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // format
  formatPrice(value) {
    return this.utilities.formatCurrency(value);
  }

  getAddress(city, district, ward) {
    let result = '';
    if (city) {
      result += city;
      if (district) {
        result += ', ' + district;
        if (ward) {
          result += ', ' + ward;
        }
      }
    }
    return result;
  }
}
