import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
import { OverlayService } from 'src/app/common/overlay/overlay.service';
import { Constants } from 'src/app/common/constant/Constants';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  dataLogin = {
    email: '',
    password: ''
  };
  errMessageLogin = {
    user: '',
    pass: ''
  };

  dataReset = {
    email: ''
  };
  errMessageReset = {
    email: ''
  };

  dataRegister = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  errMessageRegister = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  mess: MessageSystem = new MessageSystem();
  constructor(
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public utilities: Utilities,
    private overlayService: OverlayService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService) { }
  login = true;
  reset = false;
  register = false;
  activeForm = 1;
  ngOnInit(): void {

  }

  // toast
  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'New password has been send your mail.' });
  }

  addSingle2() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Register successfully.' });
  }

  clear() {
    this.messageService.clear();
  }


  // login
  validateUserName() {
    this.errMessageLogin.user = '';
    if (this.dataLogin.email) {
      if (!this.utilities.validMail(this.dataLogin.email)) {
        this.errMessageLogin.user = this.mess.getMessage('MSE00089');
      }
    } else { this.errMessageLogin.user = this.mess.getMessage('MSE00001', 'Email'); }
  }

  validateUserPassword() {
    this.errMessageLogin.pass = '';
    if (!this.dataLogin.password) {
      this.errMessageLogin.pass = this.mess.getMessage('MSE00001', 'Password');
    }
  }

  loginClick() {
    if (!this.dataLogin.email) { this.errMessageLogin.user = this.mess.getMessage('MSE00001', 'Email'); }
    if (!this.dataLogin.password) {
      this.errMessageLogin.pass = this.mess.getMessage('MSE00001', 'Password');
    }
    if (!this.errMessageLogin.user && !this.errMessageLogin.pass) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      this.loginService.loginUser(this.dataLogin).subscribe((res: any) => {
        if (res) {
          if (localStorage.getItem('session')) {
            localStorage.removeItem('session');
          }
          localStorage.setItem('session', JSON.stringify(res));
          this.router.navigate(['/']);
          this.overlayService.close();
        }
      }, (err) => {
        this.overlayService.close();
        this.confirmationService.confirm({
          rejectVisible: false,
          acceptLabel: 'OK',
          message: this.mess.getMessage('MSE00074'),
          accept: () => {

          }
        });
      });
    }
  }
  ///////////

  // reset
  validateUserReset() {
    this.errMessageReset.email = '';
    if (this.dataReset.email) {
      if (!this.utilities.validMail(this.dataReset.email)) {
        this.errMessageReset.email = this.mess.getMessage('MSE00089');
      }
    } else { this.errMessageReset.email = this.mess.getMessage('MSE00001', 'Email'); }
  }

  async resetPassword() {
    if (!this.dataReset.email) { this.errMessageReset.email = this.mess.getMessage('MSE00001', 'Email'); }
    if (!this.errMessageReset.email) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      await this.loginService.resetPass(this.dataReset).subscribe((res: any) => {
        if (res) {
          this.addSingle();
          this.login = true;
          this.register = false;
          this.reset = false;
          this.router.navigate(['/login']);
          this.overlayService.close();
        }
      });
    }
  }

  // register
  validateUserRegister() {
    this.errMessageRegister.email = '';
    if (this.dataRegister.email) {
      if (!this.utilities.validMail(this.dataRegister.email)) {
        this.errMessageRegister.email = this.mess.getMessage('MSE00089');
      }
    } else { this.errMessageRegister.email = this.mess.getMessage('MSE00001', 'Email'); }
  }

  validatePasswordRegister() {
    this.errMessageRegister.password = '';
    if (!this.dataRegister.password) {
      this.errMessageRegister.password = this.mess.getMessage('MSE00001', 'Password');
    } else {
      if (this.dataRegister.password.length < 8) {
        this.errMessageRegister.password = this.mess.getMessage('MSE00090');
      }
    }
  }

  validateConfirmPasswordRegister() {
    this.errMessageRegister.confirmPassword = '';
    if (!this.dataRegister.confirmPassword) {
      this.errMessageRegister.confirmPassword = this.mess.getMessage('MSE00001', 'Password');
    } else {
      if (this.dataRegister.confirmPassword !== this.dataRegister.password) {
        this.errMessageRegister.confirmPassword = this.mess.getMessage('MSE00046', 'Password');
      }
    }
  }

  registerUser() {
    if (!this.dataRegister.email) { this.errMessageRegister.email = this.mess.getMessage('MSE00001', 'Email'); }
    if (!this.dataRegister.password) { this.errMessageRegister.password = this.mess.getMessage('MSE00001', 'Email'); }
    if (!this.dataRegister.confirmPassword) { this.errMessageRegister.confirmPassword = this.mess.getMessage('MSE00001', 'Email'); }

    if (!this.errMessageRegister.email && !this.errMessageRegister.password && !this.errMessageRegister.confirmPassword) {
      this.overlayService.open(Constants.OVERLAY_WAIT_SPIN);
      const obj = {
        email: this.dataRegister.email,
        password: this.dataRegister.password
      }
      this.loginService.registerUser(obj).subscribe((res: any) => {
        if (res) {
          if (!res.error) {
            this.addSingle2();
            this.login = true;
            this.register = false;
            this.reset = false;
            this.router.navigate(['/login']);
            this.overlayService.close();
          } else {
            this.overlayService.close();
            if (res.error === 'MSE00029') {
              this.confirmationService.confirm({
                rejectVisible: false,
                acceptLabel: 'OK',
                message: this.mess.getMessage('MSE00029'),
                accept: () => {

                }
            });
            }
          }
        }
      });
    }
  }

  // change status
  changeLogin() {
    this.login = true;
    this.register = false;
    this.reset = false;
  }

  changeRegister() {
    this.login = false;
    this.register = true;
    this.reset = false;
  }

  changeReset() {
    this.login = false;
    this.register = false;
    this.reset = true;
  }
}
