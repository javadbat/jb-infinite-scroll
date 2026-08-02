# jb-infinite-scroll

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-infinite-scroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-infinite-scroll/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-infinite-scroll)](https://www.npmjs.com/package/jb-infinite-scroll)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-infinite-scroll)

Infinite-scroll container web component with loading, empty, ended, scroll-capture, and chat-style stick-to-bottom states.

- Custom content slot.
- Custom loading and empty states.
- Scroll-end event for loading more data.
- Capture guard to prevent duplicate load calls.
- Stick-to-bottom behavior for chat or log views.

## When to use

Use `jb-infinite-scroll` when a scrollable area should ask the app to load more content as the user reaches the bottom. Start with the [normal content demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--normal).

Use `stick-to-bottom` when the content behaves like a chat or log feed and should stay pinned to the bottom while the user is already near the bottom; see the [stick-to-bottom demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--stick-to-bottom).

## Demo

- [CodePen](https://codepen.io/javadbat/pen/EaYGGEo)
- [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--overview)
- [Load-more demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--action-template)

## Using With JS Frameworks

<a href="https://github.com/javadbat/jb-infinite-scroll/tree/main/react" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React.js-jb--infinite--scroll%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" /></a> See the [React documentation](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll-react-readme--docs).

Other integrations: <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#angular" target="_blank" rel="noopener noreferrer">Angular</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#vue" target="_blank" rel="noopener noreferrer">Vue</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nuxt" target="_blank" rel="noopener noreferrer">Nuxt</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#svelte" target="_blank" rel="noopener noreferrer">Svelte</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#solidjs" target="_blank" rel="noopener noreferrer">SolidJS</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#lit" target="_blank" rel="noopener noreferrer">Lit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nextjs" target="_blank" rel="noopener noreferrer">Next.js</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#astro" target="_blank" rel="noopener noreferrer">Astro</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#blazor" target="_blank" rel="noopener noreferrer">Blazor</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#server-rendered-templates" target="_blank" rel="noopener noreferrer">Server-rendered templates</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#wordpress" target="_blank" rel="noopener noreferrer">WordPress</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#alpinejs-and-htmx" target="_blank" rel="noopener noreferrer">Alpine.js and HTMX</a>

## Installation

```sh
npm i jb-infinite-scroll
```

```js
import 'jb-infinite-scroll';
```

```html
<jb-infinite-scroll>
  <div slot="content">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</jb-infinite-scroll>
```

## API reference

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `is-loading` | `boolean` | `false` | Shows loading UI and prevents `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `is-list-empty` | `boolean` | `false` | Shows empty UI, hides content, and prevents `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--empty) |
| `is-list-ended` | `boolean` | `false` | Marks the list as ended and prevents future `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `disable-capture-scroll` | `boolean` | `false` | Disables `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `state-change-waiting-behavior` | `'FORCE_WAIT' \| 'NO_WAIT'` | `FORCE_WAIT` | Controls whether `scrollEnd` waits for a state change before it can fire again. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `stick-to-bottom` | `boolean` | `false` | Keeps the scroll position at the bottom when content changes, unless the user has scrolled more than 6.25rem from the bottom. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--stick-to-bottom) |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `isLoading` | `boolean` | no | Shows loading UI and prevents `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `isListEmpty` | `boolean` | no | Shows empty UI and prevents `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--empty) |
| `isListEnded` | `boolean` | no | Marks the list as ended and prevents future `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `disableCaptureScroll` | `boolean` | no | Disables `scrollEnd` capture while true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `stateChangeWaitingBehavior` | `'FORCE_WAIT' \| 'NO_WAIT'` | no | Controls waiting behavior after `scrollEnd` fires. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |
| `canCaptureScroll` | `boolean` | yes | `true` when scroll capture is currently allowed. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) |

### Methods

| name | returns | description |
| --- | --- | --- |
| `scrollTo(options)` | `void` | Forwards `scrollTo` to the internal scrollable content wrapper. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-manipulation) |
| `scrollTo(x, y)` | `void` | Forwards coordinate scrolling to the internal scrollable content wrapper. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-manipulation) |
| `scrollToEnd(options?)` | `void` | Scrolls the internal content wrapper to the bottom. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-manipulation) |

### Events

| event | detail | description |
| --- | --- | --- |
| `scroll` | none | Dispatched from the host when the internal content wrapper scrolls. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-event-test) |
| `scrollEnd` | none | Dispatched when the internal scroll wrapper reaches the bottom and `canCaptureScroll` is true. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--action-template) |
| `load` | none | Dispatched from `connectedCallback` before initialization. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--normal) |
| `init` | none | Dispatched from `connectedCallback` after initialization. [Demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--normal) |

## Content

Put the scrollable list or content in `slot="content"`; the [normal content demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--normal) shows the required slot.

```html
<jb-infinite-scroll>
  <div slot="content">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</jb-infinite-scroll>
```

## Load more on scroll end

Listen to `scrollEnd`, start your fetch, then update `isLoading`, `isListEnded`, or `isListEmpty` so the component can capture the next scroll when using the default `FORCE_WAIT` behavior. The [load-more demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--action-template) shows this cycle.

```js
const infiniteScroll = document.querySelector('jb-infinite-scroll');

infiniteScroll.addEventListener('scrollEnd', async () => {
  infiniteScroll.isLoading = true;

  const nextItems = await loadMoreItems();
  renderItems(nextItems);

  infiniteScroll.isLoading = false;
  infiniteScroll.isListEnded = nextItems.length === 0;
});
```

`scrollEnd` is not dispatched while any of these are true:

- `isLoading`
- `isListEmpty`
- `isListEnded`
- `disableCaptureScroll`
- waiting for a state change after a previous `scrollEnd` in `FORCE_WAIT` mode

## Loading state

The [load-more demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--action-template) shows the default loading state while new content is fetched.

```html
<jb-infinite-scroll is-loading="true">
  <div slot="loading">Loading...</div>
</jb-infinite-scroll>
```

```js
document.querySelector('jb-infinite-scroll').isLoading = true;
```

The default loading UI uses [`jb-loading`](https://github.com/javadbat/jb-loading).

## Empty state

Use the [empty state demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--empty) to see custom empty-slot content.

```html
<jb-infinite-scroll is-list-empty="true">
  <div slot="empty">No items found</div>
</jb-infinite-scroll>
```

```js
document.querySelector('jb-infinite-scroll').isListEmpty = true;
```

## Ended state

Use `is-list-ended` when there is no more data to load. Its capture guard is covered in the [state guards demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards).

```html
<jb-infinite-scroll is-list-ended="true"></jb-infinite-scroll>
```

```js
document.querySelector('jb-infinite-scroll').isListEnded = true;
```

## Disable scroll capture

Use the [state guards demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards) to compare disabled capture with loading, empty, ended, and `NO_WAIT` modes.

```js
document.querySelector('jb-infinite-scroll').disableCaptureScroll = true;
```

```html
<jb-infinite-scroll disable-capture-scroll="true"></jb-infinite-scroll>
```

## State-change waiting behavior

The default `state-change-waiting-behavior` is `FORCE_WAIT`. After `scrollEnd` fires, the component waits until one of the state setters runs, such as `isLoading = true`, `isLoading = false`, `isListEnded = true`, or `isListEmpty = true`. This prevents multiple load calls for the same bottom position. Compare it with `NO_WAIT` in the [state guards demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--state-guards).

Use `NO_WAIT` only when your app handles duplicate calls itself.

```html
<jb-infinite-scroll state-change-waiting-behavior="NO_WAIT"></jb-infinite-scroll>
```

## Change scroll position

The [scroll manipulation demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-manipulation) provides controls for both methods.

```js
const infiniteScroll = document.querySelector('jb-infinite-scroll');

infiniteScroll.scrollTo({ behavior: 'smooth', top: 400 });
infiniteScroll.scrollToEnd({ behavior: 'smooth' });
```

## Stick to bottom

Use `stick-to-bottom` for chat, logs, or feeds where new content should keep the scroll at the bottom while the user is already near the bottom. The [stick-to-bottom demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--stick-to-bottom) shows content growth while pinned.

```html
<jb-infinite-scroll stick-to-bottom>
  <div slot="content">
    <!-- messages -->
  </div>
</jb-infinite-scroll>
```

If the user scrolls more than 6.25rem away from the bottom, automatic stick-to-bottom pauses to respect the user's position. Call `scrollToEnd()` when you must force the bottom position.

## Slots

The [normal demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--normal) uses the content slot, while the [empty demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--empty) uses the empty slot.

| slot | description |
| --- | --- |
| `content` | Scrollable list/content area. |
| `loading` | Custom loading UI. Defaults to `jb-loading`. |
| `empty` | Custom empty-list UI shown when `isListEmpty` is true. |

## CSS parts and states

Styling is shared with the web component; the [scroll manipulation demo](https://javadbat.github.io/design-system/?path=/story/components-jbinfinitescroll--scroll-manipulation) provides a visible scroll container for inspecting these parts and states.

| part | description |
| --- | --- |
| `content-wrapper` | Internal scrollable content wrapper. |
| `loading-wrapper` | Loading wrapper shown while loading. |
| `empty-list-wrapper` | Empty-list wrapper shown while empty. |
| `default-loading` | Default `jb-loading` element inside the loading slot fallback. |

| custom state | description |
| --- | --- |
| `loading` | Applied while `isLoading` is true. |
| `empty` | Applied while `isListEmpty` is true. |

```css
jb-infinite-scroll::part(content-wrapper) {
  scroll-behavior: smooth;
}

jb-infinite-scroll:state(loading)::part(loading-wrapper) {
  padding: 1rem;
}
```

## Related Docs

- See [`jb-infinite-scroll/react`](https://github.com/javadbat/jb-infinite-scroll/tree/main/react) if you want to use this component in React.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-infinite-scroll` once before using `<jb-infinite-scroll>`.
- Put the scrollable content inside `slot="content"`.
- Listen to `scrollEnd` for load-more behavior.
- Listen to `scroll` only when you need regular scroll-position updates from the internal scroll wrapper.
- In default `FORCE_WAIT` mode, update a state such as `isLoading`, `isListEnded`, or `isListEmpty` after `scrollEnd` so future scroll capture can resume.
- Set `isListEnded = true` when the API has no more data.
- Use `scrollToEnd()` for chat/log views that need to force the bottom position.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-infinite-scroll` tag name to `JBInfiniteScrollWebComponent`.
