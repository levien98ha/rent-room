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

  };
  name = 'Angular 4';
  url: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
  public delete() {
    this.url = null;
  }
}
