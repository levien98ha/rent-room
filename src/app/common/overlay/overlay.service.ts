import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  ApplicationProperties = {
    TIME_COUNTDOWN: 1
  };

  openOverlay = false;
  isShowOverlay = new BehaviorSubject({open: false, spin: false});
  interval;
  timeLeft = this.ApplicationProperties.TIME_COUNTDOWN;
  isSpin = false;

  constructor() {

  }

  open(spin) {
    this.isSpin = spin;
    setTimeout(() => {
      if (!this.openOverlay) {
        try {
          this.openOverlay = true;
          this.isShowOverlay.next({open: this.openOverlay, spin: this.isSpin});
          clearInterval(this.interval);
          this.timeLeft = this.ApplicationProperties.TIME_COUNTDOWN;
          this.startTimer();
        } catch (error) {
        }
      }
    });
  }

  close() {
    setTimeout(() => {
      if (this.openOverlay) {
        this.openOverlay = false;
        this.isShowOverlay.next({open: this.openOverlay, spin: this.isSpin});
      }
    }, (this.timeLeft) * 1000);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
