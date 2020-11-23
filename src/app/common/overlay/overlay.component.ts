import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OverlayService} from './overlay.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
  flagCloseModal = false;
  flagCloseModalSub: Subscription;
  openOverlay = true;
  isSpin = false;
  constructor(
    private overlayService: OverlayService
  ) {
  }

  ngOnInit() {
    this.overlayService.isShowOverlay.subscribe(res => {
      this.openOverlay = res.open;
      this.isSpin = res.spin;
    });
  }

  noThing(event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.flagCloseModalSub) {
      this.flagCloseModalSub.unsubscribe();
    }
  }

}
