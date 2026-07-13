import { JBDictionary } from "jb-core/i18n";

export type JBInfiniteScrollDictionary = {
  loadingMoreItems: string;
};

export const dictionary = new JBDictionary<JBInfiniteScrollDictionary>({
  fa: { loadingMoreItems: "در حال بارگذاری موارد بیشتر" },
  en: { loadingMoreItems: "Loading more items" },
});
