import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Utilities } from '../../../common/utilites';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  listCity = [];
  listDistrict = [];
  listWard = [];
  listCategory = [{
      id: 1,
      name: 'Room'
    },
    {
      id: 2,
      name: 'House'
    }
  ];
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedCategory: any;
  minPrice: string;
  maxPrice: string;
  price: number[] = [0, 10000000];
  area: number[] = [0, 500];
  minArea: string;
  maxArea: string;

  constructor(private search: SearchService, private utilities: Utilities) {
   }

  ngOnInit(): void {
    this.getListCity();
    this.minPrice = this.utilities.formatCurrency(this.price[0]) + ' VNĐ';
    this.maxPrice = this.utilities.formatCurrency(this.price[1]) + ' VNĐ';
    this.minArea = this.utilities.formatCurrency(this.area[0]) + ' m2';
    this.maxArea = this.utilities.formatCurrency(this.area[1]) + ' m2';
  }

  getListCity() {
    this.listCity = [];
    this.search.getCity().map(item => {
      const city = {id: '', name: ''};
      city.id = item.level1_id;
      city.name = item.name;
      this.listCity.push(city);
    });
  }

  // event
  selectCity() {
    this.listDistrict = [];
    this.listWard = [];
    this.selectedDistrict = null;
    this.selectedWard = null;
    if (this.selectedCity !== null) {
      this.search.getDistrict(this.selectedCity.id).map(itemLv1 => {
        itemLv1.level2s.map(item => {
          const district = {id: '', name: ''};
          district.id = item.level2_id;
          district.name = item.name;
          this.listDistrict.push(district);
        });
      });
    }
  }

  selectDistrict() {
    this.listWard = [];
    this.selectedWard = null;
    if (this.selectedDistrict !== null && this.selectedCity !== null) {
      this.search.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
    }
  }

  showValuePrice() {
    this.minPrice = this.utilities.formatCurrency(this.price[0]) + ' VNĐ';
    this.maxPrice = this.utilities.formatCurrency(this.price[1]) + ' VNĐ';
  }

  showValueArea() {
    this.minArea = this.utilities.formatCurrency(this.area[0]) + ' m2';
    this.maxArea = this.utilities.formatCurrency(this.area[1]) + ' m2';
  }
}
