import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/app/common/utilites';
import { MessageSystem } from 'src/app/config/message/messageSystem';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataLogin = {
    user: '',
    pass: ''
  };
  errMessageLogin = {
    user: '',
    pass: ''
  };
  mess: MessageSystem = new MessageSystem();
  constructor(public utilities: Utilities) { }
  login = true;
  reset = false;
  register = false;
  activeForm = 1;
  ngOnInit(): void {

  }

  validateUserName(event) {
    if (this.dataLogin.user) {
      if (!this.utilities.validHalfWitdth(this.dataLogin.user)) {
        this.errMessageLogin.user = this.mess.getMessage('MSE00059', 'Username');
      }
    } else { this.errMessageLogin.user = this.mess.getMessage('MSE00001', 'Username'); }
  }

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
