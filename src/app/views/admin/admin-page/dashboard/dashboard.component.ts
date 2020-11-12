import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  submitted: boolean;

  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  listCity = [];
  listDistrict = [];
  listWard = [];
  // 'Room', 'House', 'Townhouse', 'Villa'
  listCategory = [{
      id: 1,
      name: 'Room'
    },
    {
      id: 2,
      name: 'House'
    },
    {
      id: 3,
      name: 'Townhouse'
    },
    {
      id: 4,
      name: 'Villa'
    }
  ];
  selectedCity: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedCategory: any;

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.dashboardService.getProducts().then(data => this.products = data);
    this.getListCity();
  }

  async editProduct(product: Product) {
    this.product = {...product};
    this.selectedCategory = this.listCategory.find(item => item.name === product.category);
    this.selectedCity = await this.listCity.find(async (item) => item.name === product.city);
    this.selectCity();
    this.selectedDistrict = await this.listDistrict.find(async (item) => item.name === product.district);
    this.selectDistrict();
    this.selectedWard = await this.listWard.find(async (item) => item.name === product.ward);
    this.productDialog = true;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        } else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  changeCategory() {

  }

  getListCity() {
    this.listCity = [];
    this.dashboardService.getCity().map(item => {
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
      this.dashboardService.getDistrict(this.selectedCity.id).map(itemLv1 => {
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
      this.dashboardService.getWard(this.selectedCity.id, this.selectedDistrict.id).map(item => {
        item.map(itemWard => {
          const ward = {id: '', name: ''};
          ward.id = itemWard.level3_id;
          ward.name = itemWard.name;
          this.listWard.push(ward);
        });
      });
    }
  }
}

export interface Product {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  city?: string;
  district?: string;
  ward?: string;
  price?: number;
  electric_price?: number;
  water_price?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
}
