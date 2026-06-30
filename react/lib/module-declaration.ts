import type { JBInfiniteScrollWebComponent } from "jb-infinite-scroll";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-infinite-scroll': JBInfiniteScrollType;
    }
    interface JBInfiniteScrollType extends React.DetailedHTMLProps<React.HTMLAttributes<JBInfiniteScrollWebComponent>, JBInfiniteScrollWebComponent> {
      "class"?: string,
      "type"?: string;
    }
  }
}
