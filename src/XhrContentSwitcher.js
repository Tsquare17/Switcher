export default class XhrContentSwitcher
{
    #className = 'XhrContentSwitcher';
    #onSwitchCall = null;

    constructor(containerSelector, linkSelector, debugging = false) {
        this.containerSelector = containerSelector;
        this.linkSelector = linkSelector;
        this.debugging = debugging;
    }

    init() {
        this.container = this.#getContainer(this.containerSelector);

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('body').addEventListener('click', e => {
                if (e.target.classList.contains(this.linkSelector.replace('.', ''))) {
                    e.preventDefault();
                    this.#replaceEvent(e);
                }
            });

            this.#getElement(this.linkSelector);
        });
    }

    onSwitch(call) {
        this.#onSwitchCall = call;
    }

    #getContainer(el) {
        return this.#getElement(el);
    }

    #replaceEvent(event) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let parser = new DOMParser();
                let doc = parser.parseFromString(xhr.responseText, 'text/html');
                this.container.innerHTML = doc.querySelector(this.containerSelector).innerHTML;

                this.#updateURL(event.target);

                if (this.#onSwitchCall) {
                    this.#onSwitchCall(event);
                }
            }
        };

        xhr.open('GET', event.target, true);
        xhr.send();
    }

    #updateURL(location) {
        window.history.pushState(null, '', location);
    }

    #getElement(selector) {
        let el = document.querySelector(selector);

        if (el === null && this.debugging) {
            console.log(this.#className + ': No elements of the class ' + selector + ' were found');
        }

        return el;
    }
}
