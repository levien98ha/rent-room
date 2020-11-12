import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  profile = {
    username_login: 'levien98',
    first_name: 'Nguyen Le',
    last_name: 'Vien',
    phone_number: '0345920977',
    email: 'nguyenlevien0907@gmail.com',
    address: '',
    image_url: '',

  }

  constructor() { }

  ngOnInit(): void {
  }

}
