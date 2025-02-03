import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-infinite-scroll",
    path: "./lib/jb-infinite-scroll.ts",
    outputPath: "./dist/jb-infinite-scroll.js",
    umdName: "JBInfiniteScroll",
    external: ["jb-loading"],
    globals: {
      "jb-loading": "JBLoading",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-infinite-scroll-react",
    path: "./react/lib/JBInfiniteScroll.tsx",
    outputPath: "./react/dist/JBInfiniteScroll.js",
    external: ["jb-infinite-scroll", "prop-types", "react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-infinite-scroll": "JBInfiniteScroll",
    },
    umdName: "JBInfiniteScrollReact",
    dir: "./react"
  },
];