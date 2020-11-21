class XhrContentSwitcher
{
    #className = 'XhrContentSwitcher';
    debugging = false;

    constructor(containerSelector, linkSelector) {
        this.containerSelector = containerSelector;
        this.linkSelector = linkSelector;
    }

    init() {
        this.container = this.#getContainer(this.containerSelector);

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('body').addEventListener('click', e => {
                if (e.target.classList.contains(this.linkSelector.replace('.', ''))) {
                    e.preventDefault();
                    this.#replaceEvent(e.target);
                }
            });

            let link = document.querySelector(this.linkSelector);
            if ((link === null || link.length === 0) && this.debugging) {
                console.log(this.#className + ': No elements of the class ' + this.linkSelector + ' were found');
            }
        });
    };

    #getContainer(el) {
        let container = document.querySelector(el);

        if ((container === null || container.length === 0) && this.debugging) {
            console.log(this.#className + ': No elements of the class ' + el + ' were found');
        }

        return container;
    }

    #replaceEvent(link) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let parser = new DOMParser();
                let doc = parser.parseFromString(xhr.responseText, 'text/html');
                this.container.innerHTML = doc.querySelector(this.containerSelector).innerHTML;
                this.#updateURL(link);
            }
        };

        xhr.open('GET', link, true);
        xhr.send();
    }

    #updateURL(location) {
        window.history.pushState(null, '', location);
    }
}
