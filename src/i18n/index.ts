/* eslint-disable import-x/max-dependencies */
import { ar } from "./ar";
import { az } from "./az";
import { bg } from "./bg";
import { bnBd } from "./bn-BD";
import { bnIn } from "./bn-IN";
import { ca } from "./ca";
import { cs } from "./cs";
import { da } from "./da";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { et } from "./et";
import { fa } from "./fa";
import { fr } from "./fr";
import { he } from "./he";
import { hr } from "./hr";
import { hu } from "./hu";
import { hy } from "./hy";
import { id } from "./id";
import { is } from "./is";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { lt } from "./lt";
import { lv } from "./lv";
import { my } from "./my";
import { nb } from "./nb";
import { nl } from "./nl";
import { pl } from "./pl";
import { pt } from "./pt";
import { ro } from "./ro";
import { rs } from "./rs";
import { rsLatin } from "./rs-latin";
import { ru } from "./ru";
import { sk } from "./sk";
import { sl } from "./sl";
import { sv } from "./sv";
import { ta } from "./ta";
import { th } from "./th";
import { tr } from "./tr";
import { uk } from "./uk";
import { vi } from "./vi";
import { zh } from "./zh";
import { zhTw } from "./zh-TW";

const translations = {
    en,
    ja,
    ar,
    az,
    bg,
    "bn-BD": bnBd,
    "bn-IN": bnIn,
    ca,
    cs,
    da,
    de,
    es,
    et,
    fa,
    fr,
    he,
    hr,
    hu,
    hy,
    id,
    is,
    it,
    ko,
    lt,
    lv,
    my,
    nb,
    nl,
    pl,
    pt,
    ro,
    rs,
    "rs-latin": rsLatin,
    ru,
    sk,
    sl,
    sv,
    ta,
    th,
    tr,
    uk,
    vi,
    zh,
    "zh-TW": zhTw
} as const;

export { translations };
