import { Component, OnInit, Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Pipe({name: 'split'})
export class ShiftPosition implements PipeTransform {
  transform(items: any, value: string): string {
      return items.substr(1) + ' ' + items.substr(0, 1);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
  title = 'FindSafe';
}
