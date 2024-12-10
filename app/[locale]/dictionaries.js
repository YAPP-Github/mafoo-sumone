import "server-only";

const dictionaries = {
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  tw: () => import("./dictionaries/tw.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (locale === "ko") return dictionaries.ko();
  if (locale === "en") return dictionaries.en();
  if (locale === "ja") return dictionaries.ja();
  if (locale === "tw") return dictionaries.tw();
  if (locale === "es") return dictionaries.es();
};
