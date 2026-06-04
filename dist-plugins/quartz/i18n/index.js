"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = exports.defaultTranslation = exports.TRANSLATIONS = void 0;
const en_US_1 = require("./locales/en-US");
const en_GB_1 = require("./locales/en-GB");
const fr_FR_1 = require("./locales/fr-FR");
const it_IT_1 = require("./locales/it-IT");
const ja_JP_1 = require("./locales/ja-JP");
const de_DE_1 = require("./locales/de-DE");
const nl_NL_1 = require("./locales/nl-NL");
const ro_RO_1 = require("./locales/ro-RO");
const ca_ES_1 = require("./locales/ca-ES");
const es_ES_1 = require("./locales/es-ES");
const ar_SA_1 = require("./locales/ar-SA");
const uk_UA_1 = require("./locales/uk-UA");
const ru_RU_1 = require("./locales/ru-RU");
const ko_KR_1 = require("./locales/ko-KR");
const zh_CN_1 = require("./locales/zh-CN");
const zh_TW_1 = require("./locales/zh-TW");
const vi_VN_1 = require("./locales/vi-VN");
const pt_BR_1 = require("./locales/pt-BR");
const hu_HU_1 = require("./locales/hu-HU");
const fa_IR_1 = require("./locales/fa-IR");
const pl_PL_1 = require("./locales/pl-PL");
const cs_CZ_1 = require("./locales/cs-CZ");
const tr_TR_1 = require("./locales/tr-TR");
const th_TH_1 = require("./locales/th-TH");
const lt_LT_1 = require("./locales/lt-LT");
const fi_FI_1 = require("./locales/fi-FI");
const nb_NO_1 = require("./locales/nb-NO");
const id_ID_1 = require("./locales/id-ID");
const kk_KZ_1 = require("./locales/kk-KZ");
const he_IL_1 = require("./locales/he-IL");
exports.TRANSLATIONS = {
    "en-US": en_US_1.default,
    "en-GB": en_GB_1.default,
    "fr-FR": fr_FR_1.default,
    "it-IT": it_IT_1.default,
    "ja-JP": ja_JP_1.default,
    "de-DE": de_DE_1.default,
    "nl-NL": nl_NL_1.default,
    "nl-BE": nl_NL_1.default,
    "ro-RO": ro_RO_1.default,
    "ro-MD": ro_RO_1.default,
    "ca-ES": ca_ES_1.default,
    "es-ES": es_ES_1.default,
    "ar-SA": ar_SA_1.default,
    "ar-AE": ar_SA_1.default,
    "ar-QA": ar_SA_1.default,
    "ar-BH": ar_SA_1.default,
    "ar-KW": ar_SA_1.default,
    "ar-OM": ar_SA_1.default,
    "ar-YE": ar_SA_1.default,
    "ar-IR": ar_SA_1.default,
    "ar-SY": ar_SA_1.default,
    "ar-IQ": ar_SA_1.default,
    "ar-JO": ar_SA_1.default,
    "ar-PL": ar_SA_1.default,
    "ar-LB": ar_SA_1.default,
    "ar-EG": ar_SA_1.default,
    "ar-SD": ar_SA_1.default,
    "ar-LY": ar_SA_1.default,
    "ar-MA": ar_SA_1.default,
    "ar-TN": ar_SA_1.default,
    "ar-DZ": ar_SA_1.default,
    "ar-MR": ar_SA_1.default,
    "uk-UA": uk_UA_1.default,
    "ru-RU": ru_RU_1.default,
    "ko-KR": ko_KR_1.default,
    "zh-CN": zh_CN_1.default,
    "zh-TW": zh_TW_1.default,
    "vi-VN": vi_VN_1.default,
    "pt-BR": pt_BR_1.default,
    "hu-HU": hu_HU_1.default,
    "fa-IR": fa_IR_1.default,
    "pl-PL": pl_PL_1.default,
    "cs-CZ": cs_CZ_1.default,
    "tr-TR": tr_TR_1.default,
    "th-TH": th_TH_1.default,
    "lt-LT": lt_LT_1.default,
    "fi-FI": fi_FI_1.default,
    "nb-NO": nb_NO_1.default,
    "id-ID": id_ID_1.default,
    "kk-KZ": kk_KZ_1.default,
    "he-IL": he_IL_1.default,
};
exports.defaultTranslation = "en-US";
const i18n = (locale) => exports.TRANSLATIONS[locale ?? exports.defaultTranslation];
exports.i18n = i18n;
