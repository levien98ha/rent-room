import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as dataAddress from '../../../../config/localtion/local.json';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  status: string[] = ['AVAILABLE', 'UNAVAILABLE', 'LOWSTOCK'];

  data = [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Trọ Hòa Khánh',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 2000000,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
          water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1001',
          code: 'nvklal433',
          name: 'Trọ Hòa Khánh',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 700000,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Trọ ở Bách Khoa',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 700000,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1003',
          code: '244wgerg2',
          name: 'Trọ ở Bạch Đằng',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 1700000,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1004',
          code: 'h456wer53',
          name: 'Trọ ở Bách Khoa',
          description: 'Product Description',
          image: 'Trọ ở Bách Khoa.jpg',
          price: 1300000,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1005',
          code: 'av2231fwg',
          name: 'Trọ ở Bạch Đằng',
          description: 'Product Description',
          image: 'brown-purse.jpg',
          price: 1350000,
          category: 'Accessories',
          quantity: 0,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1006',
          code: 'bib36pfvm',
          name: 'Chakra Trọ ở Bách Khoa',
          description: 'Product Description',
          image: 'chakra-Trọ ở Bách Khoa.jpg',
          price: 32,
          category: 'Accessories',
          quantity: 5,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1007',
          code: 'mbvjkgip5',
          name: 'Phòng trọ mới xây',
          description: 'Product Description',
          image: 'galaxy-earrings.jpg',
          price: 500000,
          category: 'Accessories',
          quantity: 23,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1008',
          code: 'vbb124btr',
          name: 'Phòng trọ mới xây',
          description: 'Product Description',
          image: 'game-controller.jpg',
          price: 750000,
          category: 'Electronics',
          quantity: 2,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1009',
          code: 'cm230f032',
          name: 'Phòng trọ Ngô Sỹ Liên',
          description: 'Product Description',
          image: 'gaming-set.jpg',
          price: 850000,
          category: 'Electronics',
          quantity: 63,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1010',
          code: 'plb34234v',
          name: 'Phòng trọ mới xây',
          description: 'Product Description',
          image: 'gold-phone-case.jpg',
          price: 1000000,
          category: 'Accessories',
          quantity: 0,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1011',
          code: '4920nnc2d',
          name: 'Phòng trọ Ngô Sỹ Liên',
          description: 'Product Description',
          image: 'green-earbuds.jpg',
          price: 1000000,
          category: 'Electronics',
          quantity: 23,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1012',
          code: '250vm23cc',
          name: 'Phòng trọ Ngô Sỹ Liên',
          description: 'Product Description',
          image: 'green-t-shirt.jpg',
          price: 1000000,
          category: 'Clothing',
          quantity: 74,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1013',
          code: 'fldsmn31b',
          name: 'Trọ gần ĐH Sư Phạm',
          description: 'Product Description',
          image: 'grey-t-shirt.jpg',
          price: 1300000,
          category: 'Clothing',
          quantity: 0,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1014',
          code: 'waas1x2as',
          name: 'Trọ gần ĐH Sư Phạm',
          description: 'Product Description',
          image: 'Trọ gần ĐH Sư Phạm.jpg',
          price: 1100000,
          category: 'Electronics',
          quantity: 8,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1015',
          code: 'vb34btbg5',
          name: 'Light Phòng trọ Ngô Sỹ Liên',
          description: 'Product Description',
          image: 'light-green-t-shirt.jpg',
          price: 1000000,
          category: 'Clothing',
          quantity: 34,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1016',
          code: 'k8l6j58jl',
          name: 'Trọ gần ĐH Ngoại Ngữ',
          description: 'Product Description',
          image: 'lime-band.jpg',
          price: 700000,
          category: 'Fitness',
          quantity: 12,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1017',
          code: 'v435nn85n',
          name: 'Trọ gần ĐH Ngoại Ngữ',
          description: 'Product Description',
          image: 'mini-speakers.jpg',
          price: 85,
          category: 'Clothing',
          quantity: 42,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1018',
          code: '09zx9c0zc',
          name: 'Trọ gần ĐH Ngoại Ngữ',
          description: 'Product Description',
          image: 'painted-phone-case.jpg',
          price: 600000,
          category: 'Accessories',
          quantity: 41,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1019',
          code: 'mnb5mb2m5',
          name: 'Trọ gần ĐH Kinh Tế',
          description: 'Product Description',
          image: 'pink-band.jpg',
          price: 700000,
          category: 'Fitness',
          quantity: 63,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1020',
          code: 'r23fwf2w3',
          name: 'Trọ gần ĐH Kinh Tế',
          description: 'Product Description',
          image: 'pink-purse.jpg',
          price: 600000,
          category: 'Accessories',
          quantity: 0,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1021',
          code: 'pxpzczo23',
          name: 'Trọ gần ĐH Kinh Tế',
          description: 'Product Description',
          image: 'purple-band.jpg',
          price: 700000,
          category: 'Fitness',
          quantity: 6,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1022',
          code: '2c42cb5cb',
          name: 'Trọ gần ĐH Kinh Tế',
          description: 'Product Description',
          image: 'purple-gemstone-necklace.jpg',
          price: 1800000,
          category: 'Accessories',
          quantity: 62,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1023',
          code: '5k43kkk23',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'purple-t-shirt.jpg',
          price: 1000000,
          category: 'Clothing',
          quantity: 2,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1024',
          code: 'lm2tny2k4',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'K47 Nguyễn Lương Bằng.jpg',
          price: 1800000,
          category: 'Clothing',
          quantity: 0,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
          water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1025',
          code: 'nbm5mv45n',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'K47 Nguyễn Lương Bằng.jpg',
          price: 2000000,
          category: 'Clothing',
          quantity: 52,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1026',
          code: 'zx23zc42c',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'teal-t-shirt.jpg',
          price: 1000000,
          category: 'Clothing',
          quantity: 3,
          inventoryStatus: 'UNAVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1027',
          code: 'acvx872gc',
          name: 'Yellow Earbuds',
          description: 'Product Description',
          image: 'yellow-earbuds.jpg',
          price: 1000000,
          category: 'Electronics',
          quantity: 35,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1028',
          code: 'tx125ck42',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'yoga-mat.jpg',
          price: 2000000,
          category: 'Fitness',
          quantity: 15,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
         water_price: 6500,
          city: 'Đà Nẵng',
          district: 'Liên Chiểu',
          ward: 'Hòa Khánh Bắc'
        },
        {
          id: '1029',
          code: 'gwuby345v',
          name: 'K47 Nguyễn Lương Bằng',
          description: 'Product Description',
          image: 'yoga-set.jpg',
          price: 2000000,
          category: 'Fitness',
          quantity: 25,
          inventoryStatus: 'AVAILABLE',
          electric_price: 3000,
          water_price: 6500
        }
      ];

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>('assets/product.json')
    .toPromise()
    .then(res => <Product[]>res.data)
    .then(data => { return data; });
  }

  getCity() {
    return (dataAddress as any).default.data;
  }

  getDistrict(id: string) {
    return (dataAddress as any).default.data.filter(item => item.level1_id === id);
  }

  getWard(idCity: string, idDistrict: string) {
    const arr = [];
    (dataAddress as any).default.data.map(itemLv1 => {
      if (itemLv1.level1_id === idCity) {
        itemLv1.level2s.map(item => {
          if (item.level2_id === idDistrict) {
            arr.push(item.level3s);
          }
        });
      }
    });
    return arr;
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
