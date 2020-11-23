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

- On `/page-1`, clicking the link will replace the contents of `<div class="container">` with the contents of `<div class="container">` from `/page-2`, and update the URL.
```js
const switcher = new XhrContentSwitcher(
    '.container', // Selector for the container to replace the contents of.
    '.switcher-link', // Selector for the links to intercept.
    false // console.log() if container or link selectors not found. default = false.
);

// Optionally, perform an action after switching content.
switcher.onSwitch(function(event) {
    console.log(event.target);
})

switcher.init();
```
