import Enlang from "./entries/en-US";
import Jalang from "./entries/ja-JP";

const AppLocale = {
  en: Enlang,
  ja: Jalang,
};

if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/en"); // Add locale data for en
  require("@formatjs/intl-pluralrules/dist/locale-data/ja"); // Add locale data for ja
}

if (!Intl.RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/en"); // Add locale data for en
  require("@formatjs/intl-relativetimeformat/dist/locale-data/ja"); // Add locale data for ja
}

export default AppLocale;
