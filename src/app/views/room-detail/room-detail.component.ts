import { Component, HostListener, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Galleria } from 'primeng/galleria';
import { Utilities } from '../../common/utilites';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  pageYoffset = 100;
  shareLink = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F';
  currentUrl = '';
  images: any[] = [{
    previewImageSrc: 'assets/img/room1.jpg',
    thumbnailImageSrc: 'assets/img/room1.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    previewImageSrc: 'assets/img/room2.jpg',
    thumbnailImageSrc: 'assets/img/room2.jpg',
    alt: 'Description for Image 2',
    title: 'Title 2'
  },
  {
    previewImageSrc: 'assets/img/room3.jpg',
    thumbnailImageSrc: 'assets/img/room3.jpg',
    alt: 'Description for Image 3',
    title: 'Title 3'
  },
  {
    previewImageSrc: 'assets/img/room4.jpg',
    thumbnailImageSrc: 'assets/img/room4.jpg',
    alt: 'Description for Image 4',
    title: 'Title 4'
  },
  {
    previewImageSrc: 'assets/img/room5.jpg',
    thumbnailImageSrc: 'assets/img/room5.jpg',
    alt: 'Description for Image 5',
    title: 'Title 5'
  }];

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

  profile = {
    img_profile: '../../../assets/photo/img_profile.jpg',
    name: 'Nguyen Le Vien',
    phone: '0345.920.977'
  };

  roomClone = {
    price: 2000000,
    electric: 3000,
    water: 5000
  };

  room = {
    price: '',
    electric: '',
    water: '',
    title: ''
  }
  @ViewChild('galleria') galleria: Galleria;

  constructor(private scroll: ViewportScroller, private cd: ChangeDetectorRef, private utilities: Utilities, private router: Router) { }

  ngOnInit(): void {
    this.bindDocumentListeners();
    // tslint:disable-next-line: forin
    for (const value in this.roomClone) {
      this.room[value] = this.utilities.formatCurrency(this.roomClone[value]) + ' VNĐ';
    }
    // this.room.price = this.utilities.formatCurrency(this.roomClone.price) + ' VNĐ';
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
}
