# Switcher

## Easily replace content without reloading the page.

Switcher, inspired by TurboLinks, sends an XHR request, swaps body content, and adds any missing scripts and styles.

---

### Example 1:
```js
    const switcher = new Switcher();
    switcher.init();
```
That's it! Switcher will automatically hijack internal links, and swap out differing html contents on click.

### Example 2:
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

document.addEventListener('DOMContentLoaded', () => {
    const switcher = new Switcher({
        containerSelector: '.container', // default = 'body'
        linkSelector: '.switcher-link', // default = 'a'
        debug: false // console.log() if container or link selectors not found. default = false.
    });

    switcher.init();
});
```

- A link can be excluded by adding the attribute `data-switcher="false"`

---
### Events

#### switcher.before
Fires after the request has been made, before the content has been replaced.

#### switcher.after
Fires after the content has been replaced.
