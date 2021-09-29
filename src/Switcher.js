export default class Switcher {
    #className = 'XhrSwitcher';

    constructor(containerSelector, linkSelector, debugging = false) {
        this.containerSelector = containerSelector;
        this.linkSelector = linkSelector;
        this.debugging = debugging;
    }

    init() {
        this.container = this.#getElement(this.containerSelector);

        document.querySelector('body').addEventListener('click', e => {
            console.log('click', e.target.classList[0]);
            if (e.target.matches(this.linkSelector)) {
                e.preventDefault();
                this.#replaceEvent(e);
            }
        });

        this.#getElement(this.linkSelector);
    }

    #replaceEvent(event) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, 'text/html');
                const newContent = doc.querySelector(this.containerSelector).innerHTML;

                const beforeSwitch = new CustomEvent('switcher.before', {
                    detail: {
                        event: event,
                        content: newContent
                    }
                });

                document.dispatchEvent(beforeSwitch);

                this.container.innerHTML = doc.querySelector(this.containerSelector).innerHTML;

                Switcher.#updateURL(event.target);

                const afterSwitch = new CustomEvent('switcher.after');
                document.dispatchEvent(afterSwitch);
            }
        };

        xhr.open('GET', event.target, true);
        xhr.send();
    }

    static #updateURL(location) {
        window.history.pushState(null, '', location);
    }

    #getElement(selector) {
        let el = document.querySelector(selector);

        if (el === null && this.debugging) {
            console.log(this.#className + ': No elements matching ' + selector + ' were found');
        }

        return el;
    }
}
