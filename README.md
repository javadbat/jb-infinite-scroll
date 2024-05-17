# jb-infinite-scroll

Infinite scroll web-component with  additional features including:

- custom list ui
- empty list state and custom empty list ui
- end of the list state
- enable/disable scroll capture

## installation
```js
 import "jb-infinite-scroll" from jb-infinite-scroll;
```
## usage
```html

  <jb-infinite-scroll></jb-infinite-scroll>

```

## instruction

### set list Data

you can set your list ui by adding a slot with `name ="infinite-scroll-content"` like the example below:

```html
    <jb-infinite-scroll>
        <div slot="infinite-scroll-content">
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
        </div>
    </jb-infinite-scroll>

```

### set loading

you can show loading by setting `is-loading = "true"`. you can set your own loading ui by adding a slot with `name = "loading-content"` like the example below:


```js
    const jbInfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.isLoading = true;
```

```html
    <jb-infinite-scroll is-loading="true">
        <div slot="loading-content">
            <p>loading</p>
        </div>
    </jb-infinite-scroll>

```

### set list empty

if there is no data to show you can set `is-list-empty = "true"`. you can set your own empty list ui by adding a slot with `name = "empty-list-content"` like the example below:

```js
    const jbInfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.isListEmpty = true;
``` 
```html
    <jb-infinite-scroll is-list-empty="true">
        <div slot="empty-list-content">
            <p>list is empty</p>
        </div>
    </jb-infinite-scroll>

```
### set list ended
if there is no more data to show you can set `is-list-ended = "true"`.this disables scroll capturing.

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


### add scroll callback
you can add your onscroll callback function to scrollEnd event listener.

if `is-loading` ,`is-list-empty` ,`is-list-ended` or `disable-capture-scroll` is true  the callback function won't be executed.

```js
    const InfiniteScroll = document.getElementByTagName('jb-infinite-scroll');
    jbInfiniteScroll.addEventListener('scrollEnd',() => {
        console.log('scroll')
    })
```

### state-change-waiting-behaviour

by default `state-change-waiting-behaviour` is `FORCE_WAIT` thats means when an scroll event fires,scroll is not captured untill on of the `is-loading` ,`is-list-empty` ,`is-list-ended` states updates.
if you want to prevent this behaviour you can set `state-change-waiting-behaviour` to `NO_WAIT`. thats means the scroll callback in not dependent on `is-loading`,`is-list-empty`,`is-list-ended` state update.


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