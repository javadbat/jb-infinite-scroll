# Changelog

## [2.0.0] - 2026-09-03

### Changed

- The `isLoading` property now reflects the standard `is-loading` HTML attribute.
- Breaking: renamed `isListEmpty`/`is-list-empty` to `isEmpty`/`is-empty` and replaced `isListEnded`/`is-list-ended` with `hasMore`/`has-more` using inverse semantics. `hasMore` defaults to `true`.
- Breaking: renamed the content surface part to `content`.
- Breaking: renamed the public `scrollEnd` event to `scroll-end`; the old event name is removed. The React handler remains `onScrollEnd`.
- Breaking: renamed the content surface part from `content-wrapper` to `content`; the old part name is removed.

## [1.8.0] - 2026-09-01

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.35.0`.
