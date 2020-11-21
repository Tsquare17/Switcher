# XhrContentSwitcher

### Easily replace content without reloading the page.

#### Example:
- URL: /page-1
```html
<div class="container">
    <div class="content">
        <a href="/page-2" class="switcher-link">Page 2</a>
    </div>
</div>
```

- URL: /page-2
```html
<div class="container">
    <div class="content">
        <a href="/page-1" class="switcher-link">Page 1</a>
    </div>
</div>
```

```js
const switcher = new XhrContentSwitcher('.container', '.switcher-link');

// optionally, switcher.debugging = true will console.log()
// if no elements are found matching your selectors.

switcher.init();
```

- On `/page-1`, clicking the link will replace the contents of `<div class="container">` with the contents of `<div class="container">` from `/page-2`, and update the URL.
