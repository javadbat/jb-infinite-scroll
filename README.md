# jb-infinite-scroll

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-infinite-scroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-infinite-scroll/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dw/jb-infinite-scroll)](https://www.npmjs.com/package/jb-infinite-scroll)

Infinite scroll web-component with  additional features including:

- custom list ui
- empty list state and custom empty list ui
- end of the list state
- enable/disable scroll capture
- support loading state with customizable ui

## installation
```js
 import "jb-infinite-scroll" from jb-infinite-scroll;
```
## usage
```html

  <jb-infinite-scroll></jb-infinite-scroll>

```

## instruction

### show content

you can show your content by placing any element with slot attribute `slot="infinite-scroll-content"` like the example below:

```html
    <jb-infinite-scroll>
        <div slot="infinite-scroll-content">
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
        </div>
    </jb-infinite-scroll>

```
### add scroll callback

you can add your onscroll callback function to `scrollEnd` event listener.

if `is-loading` ,`is-list-empty` ,`is-list-ended` or `disable-capture-scroll` is true  the callback function won't be executed.

```js
    const InfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.addEventListener('scrollEnd',() => {
        //load your content here
        console.log('scroll');
    })
```

### set loading

you can show loading by setting `is-loading ="true"` attribute or `isLoading` property.

```js
    const jbInfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.isLoading = true;
```
 you can also set your own loading ui by adding a slot with `slot="loading-content"` like the example below:

```html
    <jb-infinite-scroll is-loading="true">
        <div slot="loading-content">
            <p>your loading</p>
        </div>
    </jb-infinite-scroll>

```

### set list empty

if there is no data to show you can set `is-list-empty = "true"`.

```js
    const jbInfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.isListEmpty = true;
``` 
 you can set your own empty list ui by adding a slot with `slot="empty-list-content"` like the example below:
```html
    <jb-infinite-scroll is-list-empty="true">
        <div slot="empty-list-content">
            <p>list is empty</p>
        </div>
    </jb-infinite-scroll>

```
### set list ended
if there is no more data to show you can set `is-list-ended = "true"`.this disables scroll capturing and `scrollEnd` event won't be called after.

```js
    const jbInfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.isListEnded = true;
``` 
```html
    <jb-infinite-scroll is-list-ended="true">
    </jb-infinite-scroll>

```

### disable scroll capture
in some cases if you want to disable capture scroll you can set `disable-capture-scroll = "true"`'

```js
    const InfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    InfiniteScroll.disableCaptureScroll = true;
``` 




### state-change-waiting-behavior

by default `state-change-waiting-behavior` is `FORCE_WAIT` thats means when an scroll event fires,scroll is not captured until on of the `is-loading` ,`is-list-empty` ,`is-list-ended` states updates.
if you want to change this behavior you can set `state-change-waiting-behavior` to `NO_WAIT`. thats means the scroll callback in not dependent on `is-loading`,`is-list-empty`,`is-list-ended` state update.


### usage overview
```html
    <jb-infinite-scroll is-list-empty="true" is-loading="true">
        <div slot="infinite-scroll-content">
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
        </div>
        <div slot="empty-list-content">
            <p>list is empty</p>
        </div>
        <div slot="loading-content">
            <p>loading</p>
        </div>
    </jb-infinite-scroll>
```

## Other Related Docs:

- see [jb-infinite-scroll/react](https://github.com/javadbat/jb-infinite-scroll/tree/main/react) if you want to use this component in react.

- see [All JB Design system Component List](https://github.com/javadbat/design-system/blob/main/docs/component-list.md) for more components.

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.