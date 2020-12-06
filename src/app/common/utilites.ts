import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Utilities {
  CURRENCY = {
    0: '¥',
    1: '$',
    2: '€',
    3: ':'
  };

  constructor(
    private router: Router) {

  }
  /**
   * Check empty Object
   * @param object
   */
  isEmptyObject(object: Object) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && !!object[key]) {
        return false;
      }
    }
    return true;
  }

  isEmptyData(value) {
    return !value || value == '';
  }
  /**
   * isEmptyString
   * @param  string
   */
  isEmptyString(string: string) {
    return !string || string?.toString().trim() === '';
  }
  /**
   * isMac
   * @param value
   */
  isMac() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  }
  /**
   * Check valid Zipcode
   * @param value
   */
  validZipCode(value: string) {
    return value && /^([0-9/-]*)$/g.test(value);
  }

  /**
   * Check valid Tel/Fax
   * @param value
   */
  validPhoneNumber(value: string) {
    return value && /^([0-9/-]*)$/g.test(value);
  }
  /**
   * Check valid Mail
   * @param value
   */
  validMail(value: string) {
    return value && /^([a-z0-9A-Z](\.?[a-z0-9A-Z]){1,})\@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }


  /**
  * Check valid percent
  * @param value
  */
  validPercent(value: string) {
    return value && /^(0*100{1,1}\.?((\?<=\.)0*)?%?$)|(^0*\d{0,2}\.?((\?<=\.)\d{0,1})?%?)$/g.test(value);

  }

  /**
   * Check valid percent
   * @param value
  */
  validPercentForSale(value: string) {
    return value && /^(0*100{1,1}\.?((\?<=\.)0*)?$)|(^0*\d{0,2}\.?((\?<=\.)\d{0,1})?)$/g.test(value);

  }

  /**
   * Check valid item number
   * @param value
   */
  validNumber(value: any) {
    return value && /^([0-9]*)$/g.test(value);
  }

  /**
   *  Valid Integer
   * @param value
   */
  validInteger(value: string) {
    return value && /^-?([0-9]*)$/g.test(value);
  }

  /**
   * Check valid password
   * @param value
   */
  validPassword(value: any) {
    return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/g.test(value);
  }

  /**
   * validalphanumeric
   */
  public validAlphanumeric(value: any) {
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(value);
  }

  public validCharecter(value: any) {
    const regex = /^[a-zA-Z0-9-]*$/;
    return regex.test(value);
  }
  /**
   * Regex for matching full-width Katakana
   * Regex for matching half-width Katakana
   * half-width: \uff66-\uff9f
   * full-width: \u30a0-\u30ff
   * number full-width: \uff10-\uff19
   * 0 1 2 3 4 5 6 7 8 9
   *
   * @param value
   */
  validKana(value: any) {
    return value && /^([0-9\u30a0-\u30ff\uff66-\uff9f\uff10-\uff19 ]*)$/g.test(value);
  }

  validHalfWitdth(value: any) {
    // return (value && /^[^ぁ-んァ-ン一-龥]*$/g.test(value));
    let len = 0;
    for (let i = 0; i < value?.length; i++) {
      const code = value.charCodeAt(i);
      if ((code >= 0x0020 && code <= 0x1FFF) || (code >= 0xFF61 && code <= 0xFF9F)) {
        len = 1;
      } else if ((code >= 0x2000 && code <= 0xFF60) || (code >= 0xFFA0)) {
        len = 2;
        return false;
      } else {
        len += 0;
      }
    }
    return len > 1 ? false : true;
  }

  /**
   * validate full-size character
   *  @author ThanhPD
   * @param value
   */
  validateFullsize(value) {
    let len = 0;
    for (let i = 0; i < value?.length; i++) {
      const code = value.charCodeAt(i);
      if ((code >= 0x0020 && code <= 0x1FFF) || (code >= 0xFF61 && code <= 0xFF9F)) {
        len = 2;
        return false;
      } else if ((code >= 0x2000 && code <= 0xFF60) || (code >= 0xFFA0)) {
        len = 1;
      } else {
        len += 0;
      }
    }
    return len > 1 ? false : true;
  }

  /**
   * Replace `-` format in string
   * @param value
   */

  unFormat(value) {
    return value && value.replace(/-/g, '');
  }
  /**
   * Format `-` for Zipcode
   * @param value
   */
  formatZipCode(value) {
    return value && (value.substring(0, 3) + '-' + value.substring(3));
  }
  /**
   * Format `-` for tel/fax
   * @param value
   */
  formatPhoneNumber(value) {
    return value && (value.length == 10 ? (value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6)) : (value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7)));
  }
  /**
   * Format `-` for tel/fax
   * @param value
   */
  formatCurrency(value) {
    return value && this.roundUp(value, 2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  formatCurrencyNegative(value) {
    value = value.replace('-', '');
    return value && this.roundUp(value, 2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  formatCurrency0(value) {
    return value && Number(value) && Number(Number(value).toFixed(0)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  testCurrencyCommas(value) {
    return value && /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{0,9})?$/.test(value);
  }
  testCurrency(value) {
    return value && /^(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,3})?$/.test(value);
  }
  formatDisplayCurrencyIDec(value) {
    return value && value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  formatDisplayCurrency(value) {
    return value && Number(value) &&
      (Number(value) % 1 ? value.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,') :
        this.formatDisplayCurrencyIDec(value.toString()));
  }
  testNumberDecimal(value) {
    return value && /^(([1-9]\d{0,1}[0-9]*)|0)?(\.\d{0,7})?$/.test(value);
  }
  roundDown(numbers, decimals) {
    decimals = decimals || 0;
    return (Math.floor(numbers * Math.pow(10, decimals)) / Math.pow(10, decimals));
  }
  /**
   * Format percent
   * @param value
   */
  formatPercent(value) {
    return value && parseFloat(value) + '%';
  }
  /**
   * Navigate to a screen
   */
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  /**
   * random number
   */
  shuffle(lengthNumber) {
    const resultArrays = Array(lengthNumber).fill(0).map((x, i) => Math.floor(Math.random() * Math.floor(10)));
    for (let j, x, i = lengthNumber; i; j = Math.floor(Math.random() * i), x = resultArrays[--i], resultArrays[i] = resultArrays[j], resultArrays[j] = x) { }
    return resultArrays;
  }

  validTimeHour(value: any, flgCommon = false) {
    return flgCommon ? value && /^(([01]?[0-9]|2[0-3])[0-5][0-9])$/g.test(value) : value && /^(([01]?[0-9]|2[0-3]):[0-5][0-9])$/g.test(value);
  }

  formatDateYYYYMMDD(value: any) {
    const check = val => {
      const arrDate = value.split(/\//);
      const date = new Date(parseInt(arrDate[0]), parseInt(arrDate[1]) - 1, parseInt(arrDate[2]));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      arrDate[0] = Number(arrDate[0]) < 100 ? Number(arrDate[0]) + 1900 : arrDate[0];
      return year === Number(arrDate[0])
        && month === Number(arrDate[1])
        && day === Number(arrDate[2]);
    };

    return value && /(\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/g.test(value) && check(value);
  }

  formatDateDDMMYYY(value: any) {
    // tslint:disable-next-line: max-line-length
    const regex = /(((0[1-9]|[12][0-9]|3[01])([/])(0[13578]|10|12)([/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([/])(0[469]|11)([/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([/])(02)([/])(\d{4}))|((29)(\/)(02)([/])([02468][048]00))|((29)([/])(02)([/])([13579][26]00))|((29)([/])(02)([/])([0-9][0-9][0][48]))|((29)([/])(02)([/])([0-9][0-9][2468][048]))|((29)([/])(02)([/])([0-9][0-9][13579][26])))/g;
    return regex.test(value);
  }

  formatDateYYYYMM(value: any) {
    const check = val => {
      const arrDate = value.split(/\//);
      return Number(arrDate[0]) && Number(arrDate[1]) && arrDate.length === 2;
    };

    return value && /(\d{4}\/(0[1-9]|1[0-2]))/g.test(value) && check(value);
  }

  isNumber(value: any) {
    const str = value.toString();
    const regex = /\d+/g;
    return regex.test(str);
  }

  formatTimeHHMMSS(value: any) {
    return value && /^(([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/g.test(value);
  }
  formatTimeHHMM(value: any) {
    return value && /^(([01]?[0-9]|2[0-3]):[0-5][0-9])$/g.test(value);
  }
  formatDateTime(date: any) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1); // getMonth() is zero-based
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    const ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return [yyyy, mm, dd].join('/') + ' ' + [hh, min].join(':');
  }
  formatDateYMD(date: any) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1); // getMonth() is zero-based
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return [yyyy, mm, dd].join('/');
  }
  formatDateTimeJP1(date: any) {
    date = date.replace(' ', 'T');
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1; // getMonth() is zero-based
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return yyyy + ' 年 ' + [mm, dd].join('/') + ' ' + [hh, min].join(':');
  }

  formatDateTimeJP2(date: any) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1; // getMonth() is zero-based
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return yyyy + '・' + [mm, dd].join('/') + ' ' + [hh, min].join(':');
  }
  getStringSystemDateTime() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    const ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return [yyyy, mm, dd, hh, min, ss].join('');
  }

  convertTextArea(value) {
    return value.replace('↵', '\n');
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }

  roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  isValidDate(dateInputStr) {
    if (dateInputStr === null) { return false; }
    if (dateInputStr.length === 0) { return true; }
    let arrDate;
    (dateInputStr._d && (arrDate = dateInputStr._d.toDateString().split(/\//))) || (arrDate = dateInputStr.split(/\//));
    const date = new Date(parseInt(arrDate[0]), parseInt(arrDate[1]) - 1, parseInt(arrDate[2]));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year === Number(arrDate[0])
      && month === Number(arrDate[1])
      && day === Number(arrDate[2])
      && dateInputStr.length == 10;
  }

  isValidDateInput(dateInputStr) {
    if (dateInputStr === null) { return false; }
    if (dateInputStr.length === 0) { return true; }
    let arrDate;
    let aDate;
    if (dateInputStr._d || (typeof dateInputStr.getMonth === 'function')) { return true; }

    aDate = this.convertDateToString(new Date(dateInputStr));
    arrDate = dateInputStr.split('/');
    if (arrDate.length < 2) { return false; }
    const nDate = arrDate[0] + '/' + ('0' + (arrDate[1])).slice(-2) + '/' + ('0' + (arrDate[2])).slice(-2);
    if (aDate != nDate) { return false; }
    return true;
  }
  // valid DATE : MM/DD
  isValidMMDD(dateInputStr) {
    dateInputStr = dateInputStr.replace(/ /g, '');
    if (dateInputStr === null) { return false; }
    if (dateInputStr.length === 0) { return true; }
    let arrDate;
    (dateInputStr._d && (arrDate = dateInputStr._d.toDateString().split(/\//))) || (arrDate = dateInputStr.split(/\//));
    if (arrDate.length > 2) { return false; }
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, parseInt(arrDate[0]) - 1, parseInt(arrDate[1]));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month === Number(arrDate[0])
      && day === Number(arrDate[1])
      && dateInputStr.length === 5 && year === currentYear;
  }
  convertDateToString(date) {
    if (!date) { return ''; }
    if (date instanceof Date && isNaN(date.getTime())) { return ''; }
    if (typeof date === 'string') { return date; }
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return date.getFullYear() + '/' + month + '/' + day;
  }

  convertTimeToString(date) {
    if (!date) { return ''; }
    if (date instanceof Date && isNaN(date.getTime())) { return ''; }
    if (typeof date === 'string') { return date; }
    return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
  }

  convertStringToObjectDate(dateInputStr) {
    if (!dateInputStr) { return ''; }
    // if (typeof dateInputStr === 'object' || typeof dateInputStr === 'string') return dateInputStr;
    if (typeof dateInputStr === 'object') { return dateInputStr; }
    const arrDate = dateInputStr.split(/\//);
    return new Date(parseInt(arrDate[0]), parseInt(arrDate[1]) - 1, parseInt(arrDate[2]));
  }

  compareTwoDate(startDate, endDate, type = 1) {
    if (type === 1) {
      return startDate <= endDate;
    } else {
      return startDate < endDate;
    }
  }

  compareThreeDate(startDate, endDate, objDate) {
    if (startDate.length == 0 && endDate.length == 0) {
      return true;
    }
    if (startDate.length == 0) {
      return objDate <= endDate;
    } else if (endDate.length == 0) {
      return startDate <= objDate;
    } else {
      return startDate <= objDate && objDate <= endDate;
    }
  }

  trimText(value: any) {
    return value ? value.toString().trim() : '';
  }

  downLoadFile(blob: any, filename: string): string {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  encodeParams(value: any) {
    return encodeURIComponent(value);
  }

  updateObject(object, resultObject) {
    for (const key in object) {
      if (!resultObject.hasOwnProperty(key)) {
        continue;
      }
      resultObject[key] = object[key];
    }
  }

  compareObject(obj1, obj2) {
    let arrayKey = Object.keys(obj1);
    let arraySub = Object.keys(obj2);
    for (let i = 0; i < arrayKey.length; i++) {
      if (!obj1[arrayKey[i]]) {
        delete obj1[arrayKey[i]];
      }
    }
    for (let i = 0; i < arraySub.length; i++) {
      if (!obj2[arraySub[i]]) {
        delete obj2[arraySub[i]];
      }
    }
    arrayKey = Object.keys(obj1);
    arraySub = Object.keys(obj2);
    if (arrayKey.length !== arraySub.length) {
      return true;
    }
    let countError = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrayKey.length; i++) {
      if (!obj1[arrayKey[i]]) {
        obj1[arrayKey[i]] = '';
      }
      if (!obj2[arrayKey[i]]) {
        obj2[arrayKey[i]] = '';
      }
      if (obj1[arrayKey[i]] == obj2[arrayKey[i]]) {
        continue;
      } else {
        countError = 1;
        break;
      }
    }
    if (countError > 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @author AnhNQ1
   * @param name
   * @param value
   * @param days
   */
  setCookie(name, value, option?: { day?: number, domain?: string }) {
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + ((option?.day) * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
    const d = option?.domain || window.location.hostname;
    document.cookie = `${name}=${(value || '')} ${expires}; path=/; domain=${d}`;
    // document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  /**
   * @author AnhNQ1
   * @param name
   */
  getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      let c = cookie;
      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
    }
    return null;
  }
  eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0';
  }

  checkFileEmpty(file) {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result) {
          resolve(true);
        }
      };
      reader.onerror = (event: any) => {
        reject(event);
      };
      reader.readAsDataURL(file);
    });
    return promise;
  }
}
