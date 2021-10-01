export default class Switcher {
    #className = 'Switcher';
    #headElements = [];
    #bodyScripts = [];
    #updateNodes = [];

    constructor({containerSelector = 'body', linkSelector = 'a', debugging = false} = {}) {
        this.containerSelector = containerSelector;
        this.linkSelector = linkSelector;
        this.debugging = debugging;
    }

    init() {
        const headElements = document.querySelectorAll('head *');
        for (const el of headElements) {
            this.#headElements.push(el);
        }

        const scripts = document.querySelectorAll(this.containerSelector + ' script');
        for (const script of scripts) {
            this.#bodyScripts.push(script);
        }

        document.querySelector('body').addEventListener('click', e => {
            if (e.target.getAttribute('data-switcher') === 'false') {
                return;
            }

            if (e.target.host !== window.location.host) {
                return;
            }

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

                this.#updateHeadElements(doc);
                this.#updateBodyScripts(doc);

                const root = doc.querySelector(this.containerSelector);
                this.#updateDom(root);

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

    #updateHeadElements(doc) {
        const headElements = doc.querySelectorAll('head *');
        for (const el of headElements) {
            let isPresent = false;
            for (const existingEl of this.#headElements) {
                if (el.isEqualNode(existingEl)) {
                    isPresent = true;
                }
            }

            if (!isPresent) {
                if (el.matches('title')) {
                    document.querySelector('title').innerHTML = el.innerHTML;
                    continue;
                } else if (el.matches('script')) {
                    this.#addScript(el, 'head');
                    this.#headElements.push(el);
                    continue;
                } else if (el.matches('meta')) {
                    const matchingMetaName = document.querySelector('meta[name="' + el.getAttribute('name') + '"]');
                    if (matchingMetaName) {
                        matchingMetaName.setAttribute('content', el.getAttribute('content'));
                        continue;
                    }

                    const matchingMetaProp = document.querySelector('meta[property="' + el.getAttribute('property') + '"]');
                    if (matchingMetaProp) {
                        matchingMetaProp.setAttribute('content', el.getAttribute('content'));
                        continue;
                    }
                }

                this.#headElements.push(el);
                document.querySelector('head').appendChild(el);
            }
        }
    }

    #updateBodyScripts(doc) {
        for (const script of doc.querySelectorAll(this.containerSelector + ' script')) {
            let isPresent = false;
            for (const existingScript of this.#bodyScripts) {
                if (script.isEqualNode(existingScript)) {
                    isPresent = true;
                }
            }

            if (!isPresent) {
                this.#addScript(script, this.containerSelector);
            }
        }
    }

    #addScript(script, selector) {
        const newScript = document.createElement('script');

        this.#copyElementAttributes(script, newScript);

        if (script.innerHTML) {
            newScript.appendChild(document.createTextNode(script.innerHTML));
        }

        newScript.async = false;

        document.querySelector(selector).appendChild(newScript);
    }

    #copyElementAttributes(from, to) {
        [...from.attributes].forEach(attr => {
            to.setAttribute(attr.nodeName, attr.nodeValue);
        });
    }

    #updateDom(doc) {
        this.#updateNodes = [];
        this.#diffNodes(doc, document.querySelector(this.containerSelector));

        for (const node of this.#updateNodes) {
            if (node.current.tagName === 'BODY') {
                this.#copyElementAttributes(node.replacement, node.current);
                continue;
            }

            if (!node.current.isEqualNode(node.replacement)) {
                let element = node.replacement.cloneNode(true);
                node.current.parentNode.replaceChild(element, node.current);
            }
        }
    }

    #diffNodes(nodeA, nodeB) {
        for (let i = 0; i < nodeA.children.length; i++) {
            if (nodeA.children[i].isEqualNode(nodeB.children[i])) {
                continue;
            }

            if (nodeB.children[i]) {
                this.#diffNodes(nodeA.children[i], nodeB.children[i]);
            } else {
                return this.#updateNodes.push({current: nodeB, replacement: nodeA});
            }
        }

        if (!nodeA.isEqualNode(nodeB)) {
            this.#updateNodes.push({current: nodeB, replacement: nodeA});
        }
    }
}
