import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Utilities } from 'src/app/common/utilites';

const CURRENCY = {
  0: 'VNĐ',
  1: '$',
  2: '€',
  3: ':'
};

@Directive({
  selector: '[appModelType]',
})
export class ModelTypeDirective implements OnInit, OnChanges {

  // tslint:disable-next-line: no-input-rename
  @Input('modelType') modelType: string;
  // tslint:disable-next-line: no-input-rename
  @Input('modelVariable') modelVariable: string;
  // tslint:disable-next-line: no-input-rename
  @Input('modelUnit') modelUnit: string;
  // tslint:disable-next-line: ban-types
  @Output() modelVariableChange: EventEmitter<String> = new EventEmitter<String>();

  private valInputPercent: string;
  private valInputInteger: string;
  private valInputNumber2: string;
  constructor(
    public utilities: Utilities,
    private el: ElementRef) {
  }

  ngOnInit() {
    // tslint:disable-next-line: one-variable-per-declaration
    let placeholder, maxlenght, autocomplete, minlenght;
    switch (this.modelType) {
      case 'phonenumber':
        // placeholder = '000-0000-0000';
        maxlenght = '11';
        autocomplete = 'off';
        break;
      case 'currency':
        // placeholder = (!this.modelUnit ? CURRENCY[0] : CURRENCY[this.modelUnit]) + '9,999';
        maxlenght = '9';
        autocomplete = 'off';
        break;
      case 'currencyUSD':
        // placeholder = (!this.modelUnit ? CURRENCY[0] : CURRENCY[this.modelUnit]) + '9,999';
        maxlenght = '9';
        autocomplete = 'off';
        break;
      case 'currency2':
        maxlenght = '6';
        autocomplete = 'off';
        break;
      case 'zipcode':
        // placeholder = '000-0000';
        maxlenght = '8';
        autocomplete = 'off';
        break;
      case 'percent':
        placeholder = '100%';
        maxlenght = '5';
        autocomplete = 'off';
        this.valInputPercent = String(this.modelVariable);
        break;
      case 'percent-sale':
        placeholder = '';
        maxlenght = '4';
        autocomplete = 'off';
        this.valInputPercent = String(this.modelVariable);
        break;
      case 'number-sale':
        placeholder = '';
        maxlenght = '';
        autocomplete = 'off';
        break;
      case 'number':
        placeholder = '';
        autocomplete = 'off';
        // maxlenght = '3';
        break;
      case 'number2':
        placeholder = '';
        autocomplete = 'off';
        this.valInputNumber2 = String(this.modelVariable);
        // maxlenght = '3';
        break;
      case 'number-code':
        placeholder = '';
        autocomplete = 'off';
        maxlenght = '13';
        minlenght = '8';
        break;
      case 'number-order':
        placeholder = '0000';
        autocomplete = 'off';
        maxlenght = '4';
        break;
      case 'number-delinquencies':
        // placeholder = '000';
        autocomplete = 'off';
        break;
      case 'mail':
        placeholder = '●●●@●●.●●';
        autocomplete = 'on';
        break;
      case 'time':
        placeholder = 'hh:mm';
        autocomplete = 'off';
        maxlenght = '4';
        break;
      case 'integer':
        maxlenght = '9';
        this.valInputInteger = String(this.modelVariable);
        break;
      default:
        placeholder = '';
        maxlenght = '';
        autocomplete = '';
        minlenght = '';
        break;
    }
    // tslint:disable-next-line: no-unused-expression
    placeholder && (this.el.nativeElement.placeholder = placeholder);
    // tslint:disable-next-line: no-unused-expression
    maxlenght && (this.el.nativeElement.maxLength = maxlenght);
    // tslint:disable-next-line: no-unused-expression
    autocomplete && (this.el.nativeElement.autocomplete = autocomplete);
    // tslint:disable-next-line: no-unused-expression
    minlenght && (this.el.nativeElement.minlenght = minlenght);
    // tslint:disable-next-line: no-unused-expression
    this.modelVariable && this.onFocusout();
  }

  @HostListener('keypress', ['$event'])
  onKeypress(event: any) {
    switch (this.modelType) {
      case 'percent':
        return this.utilities.validPercent(event.key);
      case 'percent-sale':
        return this.utilities.validPercentForSale(event.key);
      case 'integer':
        if (event.key === '-') {
          if (this.el.nativeElement.value.includes('-')) {
            return false;
          } else {
            return true;
          }
        } else {
          return this.utilities.validInteger(event.key);
        }
      // case 'phonenumber':
      // case 'zipcode':
      case 'currency':
      case 'currencyUSD':
      case 'currency2':
      case 'number-sale':
      case 'number-code':
      case 'number-order':
      case 'number-delinquencies':
      case 'number':
      case 'time':
      case 'number':
        return this.utilities.validNumber(event.key);
      case 'number2':
      default:
        break;
    }
  }

  @HostListener('keyup')
  onKeyup() {
    if (this.modelType === 'percent' || this.modelType === 'percent-sale') {
      let rs;
      if (this.modelType === 'percent') {
        rs = this.utilities.validPercent(this.el.nativeElement.value);
      } else {
        rs = this.utilities.validPercentForSale(this.el.nativeElement.value);
      }
      if (!rs && this.el.nativeElement.value !== '') {
        this.el.nativeElement.value = this.valInputPercent;
      }
    } else if (this.modelType === 'currency' || this.modelType === 'currency2' || this.modelType === 'currencyUSD') {
      // tslint:disable-next-line: radix
      if (this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0) {
        // tslint:disable-next-line: radix
        this.el.nativeElement.value = parseInt(this.el.nativeElement.value);
      } else {
        this.el.nativeElement.value = '';
      }
    } else if (this.modelType === 'integer') {
      const rs = this.utilities.validInteger(this.el.nativeElement.value);
      if (!rs && this.el.nativeElement.value !== '') {
        this.el.nativeElement.value = this.valInputInteger;
      }
    }
    return true;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: any) {
    // tslint:disable-next-line: deprecation
    event = event || window.event;
    const c = event.keyCode;
    const ctrlDown = event.ctrlKey || event.metaKey;
    if (ctrlDown && c === 86) {
      return this.onKeydownControlV();
    }

    if (this.modelType === 'percent' || this.modelType === 'percent-sale') {
      setTimeout(() => {
        let rs;
        if (this.modelType === 'percent') {
          rs = this.utilities.validPercent(event.target.value);
        } else {
          rs = this.utilities.validPercentForSale(event.target.value);
        }
        if ((parseFloat(event.target.value) <= 100 && rs) || event.target.value === '.') {
          this.valInputPercent = event.target.value;
        }
        if (event.target.value.length > 1 && (parseFloat(event.target.value) === 0) && !event.target.value.includes('.')) {
          event.target.value = 0;
          return;
        }
      });
    } else if (this.modelType === 'number-order' || this.modelType === 'number'
      || this.modelType === 'number-sale' || this.modelType === 'number-delinquencies') {
      setTimeout(() => {
        // tslint:disable-next-line: radix
        if (this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0) {
          // tslint:disable-next-line: radix
          this.el.nativeElement.value = parseInt(this.el.nativeElement.value);
        } else {
          this.el.nativeElement.value = '';
        }
      });
    } else if (this.modelType === 'time') {
      setTimeout(() => {
        // tslint:disable-next-line: radix
        if ((this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0)) {
          this.el.nativeElement.value = this.el.nativeElement.value;
        } else {
          this.el.nativeElement.value = '';
        }
      });
    } else if (this.modelType === 'integer') {
      this.valInputInteger = event.target.value;
    } else if (this.modelType === 'number2') {
      this.valInputNumber2 = event.target.value;
    }
  }

  // @HostListener('keydown.control.v')
  onKeydownControlV() {
    // return false;
    switch (this.modelType) {
      case 'percent':
      case 'percent-sale':
      case 'phonenumber':
      case 'currency2':
      case 'zipcode':
      case 'number-sale':
      case 'number-code':
      case 'number-order':
      case 'time':
      case 'number-delinquencies':
      case 'currency':
      case 'currencyUSD':
        return true;
      case 'number':
        return false;
      case 'number2':
      default:
        return true;
    }
  }

  @HostListener('contextmenu')
  onRightClick() {
    switch (this.modelType) {
      case 'percent':
      case 'percent-sale':
      case 'phonenumber':
      case 'currency':
      case 'currencyUSD':
      case 'currency2':
      case 'zipcode':
      case 'number-sale':
      case 'number-code':
      case 'number-order':
      case 'number-delinquencies':
      case 'number':
      case 'number2':
      case 'time':
        return false;
      default:
        return true;
    }
  }

  @HostListener('focus')
  onFocus() {
    // tslint:disable-next-line: no-unused-expression
    !this.modelVariable && (typeof this.modelVariable !== 'number') && (this.modelVariable = '');
    if (this.modelType === 'date-picker') {
      this.el.nativeElement.value = this.utilities.convertDateToString(this.modelVariable);
    } else {
      this.el.nativeElement.value = this.modelVariable;
    }
    if (this.modelType === 'currency' || this.modelType === 'currencyUSD') {
      // tslint:disable-next-line: radix
      if (this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0) {
        // tslint:disable-next-line: radix
        this.el.nativeElement.value = parseInt(this.el.nativeElement.value);
      } else {
        this.el.nativeElement.value = '';
      }
    }
    if (this.modelType === 'number2') {
      if (this.utilities.validNumber(this.el.nativeElement.value)) {
        // tslint:disable-next-line: radix
        if (this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0) {
          // tslint:disable-next-line: radix
          this.el.nativeElement.value = parseInt(this.el.nativeElement.value);
        } else {
          this.el.nativeElement.value = this.modelVariable;
        }
      } else { this.el.nativeElement.value = this.modelVariable; }

    }
  }

  @HostListener('focusout')
  onFocusout() {
    switch (this.modelType) {
      case 'zipcode':
        this.el.nativeElement.value = this.modelVariable;
        break;
      case 'phonenumber':
        this.el.nativeElement.value = this.modelVariable;
        break;
      case 'currency':
        // tslint:disable-next-line: radix
        if (parseInt(this.modelVariable) >= 0) {
          this.el.nativeElement.value = (!this.modelUnit ? CURRENCY[0] : CURRENCY[this.modelUnit])
          + this.utilities.formatCurrency(this.modelVariable);

        } else {
          this.el.nativeElement.value = '';
        }
        break;
      case 'currencyUSD':
        // tslint:disable-next-line: radix
        if (parseInt(this.modelVariable) >= 0) {
          this.el.nativeElement.value = (!this.modelUnit ? CURRENCY[1] : CURRENCY[this.modelUnit])
          + this.utilities.formatCurrency(this.modelVariable);

        } else {
          this.el.nativeElement.value = '';
        }
        break;
      case 'currency2':
        // tslint:disable-next-line: no-unused-expression
        parseInt(this.modelVariable) > 0 && (this.el.nativeElement.value = this.utilities.formatCurrency(this.modelVariable));
        break;
      case 'percent':
        // tslint:disable-next-line: no-unused-expression
        !!parseFloat(this.modelVariable) && (this.el.nativeElement.value = this.utilities.formatPercent(this.modelVariable));
        break;
      case 'date-picker':
        this.el.nativeElement.value = this.utilities.convertDateToString(this.modelVariable);
        break;
      case 'time':
        // tslint:disable-next-line: no-unused-expression
        this.modelVariable.length >= 1 && (this.el.nativeElement.value = (this.modelVariable.substring(0, 2)
          + (!this.modelUnit ? CURRENCY[3] : CURRENCY[this.modelUnit])
          + this.modelVariable.substring(2)));
        break;
      case 'integer':
        this.el.nativeElement.value = (this.modelVariable.includes('-') ? ' - ' : '')
        + this.utilities.CURRENCY[0] + this.utilities.formatCurrencyNegative(this.modelVariable);
        break;
      case 'number2':
        if (this.utilities.validNumber(this.el.nativeElement.value)) {
          // tslint:disable-next-line: radix
          if (this.el.nativeElement.value && parseInt(this.el.nativeElement.value) >= 0) {
            // tslint:disable-next-line: radix
            this.el.nativeElement.value = parseInt(this.el.nativeElement.value);
          } else {
            this.el.nativeElement.value = this.modelVariable;
          }
        } else { this.el.nativeElement.value = this.modelVariable; }
        break;
      default:
        // tslint:disable-next-line: no-unused-expression
        typeof this.modelVariable === 'number' && (this.el.nativeElement.value = this.modelVariable);
        // tslint:disable-next-line: no-unused-expression
        typeof this.modelVariable !== 'number'  && (this.el.nativeElement.value = this.modelVariable || '');
        break;
    }
  }

  @HostListener('change')
  onChange() {
    this.modelVariable = this.el.nativeElement.value.trim();
    if (this.modelType === 'percent' && !!parseFloat(this.modelVariable)) {
      this.modelVariable = parseFloat(this.modelVariable) + '';
    } else if (this.modelType == 'currency' || this.modelType === 'currency2' || this.modelType === 'currencyUSD') {
      // tslint:disable-next-line: no-unused-expression
      this.modelVariable && (this.modelVariable = isNaN(parseInt(this.modelVariable)) ? this.modelVariable :
      (parseInt(this.modelVariable) + ''));
    }
    this.modelVariableChange.emit(this.modelVariable);
  }

  ngOnChanges() {
    if (this.modelType === 'currency' || this.modelType === 'currency2' || this.modelType === 'currencyUSD') {
    }
    this.modelVariable ? this.onFocusout() : this.onFocus();
  }

  @HostListener('drop')
  onDrop() {
    // return false;
  }

  @HostListener('dragover')
  ondragover() {
    // return false;
  }
}
