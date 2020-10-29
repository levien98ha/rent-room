import { Injectable } from '@angular/core';
import { Constants } from 'src/app/common/constant/Constants';
import { Message_JP } from './message_JP';
import { Message_EN } from './message_EN';
// @ts-ignore
import en from '../../../assets/i18n/en.json';
// @ts-ignore
import jp from '../../../assets/i18n/jp.json';
export class MessageSystem {
  lang = Constants.LANGUAGE_EN;
  constructor(...lang) {
    if (lang.length > 0 &&
      (lang[0] === Constants.LANGUAGE_EN ||
        lang[0] === Constants.LANGUAGE_JP ||
        lang[0] === Constants.LANGUAGE_ENJP)) {
      this.lang = lang[0];
    }
  }
  getMessage(FRE_CODE: string, ...param: any[]) {
    const language = this.lang;
    let messageReturn = Message_EN[FRE_CODE];
    let messageReturnJP = Message_JP[FRE_CODE];
    const paramJp = jp;
    const paramEn = en;
    for (let i = 0; i < param.length; i++) {
      const arrParams = param[i].split('.');
      let itemJp = '';
      let itemEn = '';
      if (arrParams.length === 1) {
        itemJp = param[i];
        itemEn = param[i];
        if (paramJp.hasOwnProperty(param[i])) {
          itemJp = itemJp[param[i]];
        }
        if (paramEn.hasOwnProperty(param[i])) {
          itemEn = itemEn[param[i]];
        }
      } else {
        let checkEn = true;
        let checkJp = true;
        arrParams.forEach(pr => {
          if (checkJp && ((!itemJp && !paramJp.hasOwnProperty(pr)) || (itemJp && !itemJp.hasOwnProperty(pr)))) {
            checkJp = false;
          }
          if (checkEn && ((!itemEn && !paramEn.hasOwnProperty(pr)) || (itemEn && !itemEn.hasOwnProperty(pr)))) {
            checkEn = false;
          }
          if (checkJp) {
            itemJp = itemJp ? itemJp[pr] : paramJp[pr];
          }
          if (checkEn) {
            itemEn = itemEn ? itemEn[pr] : paramEn[pr];
          }
        });
        if (!checkJp) {
          itemJp = param[i];
        }
        if (!checkEn) {
          itemEn = param[i];
        }
      }
      messageReturn = messageReturn.replace('{' + i + '}', '"' + itemEn + '"');
      messageReturnJP = messageReturnJP.replace('{' + i + '}', itemJp);
    }
    switch (language) {
      case Constants.LANGUAGE_EN:
        return messageReturn;
      case Constants.LANGUAGE_JP:
        return messageReturnJP;
      case Constants.LANGUAGE_ENJP:
        return messageReturn + ' / ' + messageReturnJP;
    }
  }
}


