import documentHtml from "../__mocks__/document"
import Switcher from "../src/Switcher"

const xhrMockClass = () => ({
    open: jest.fn(),
    send: jest.fn(function () {
        this.onreadystatechange();
    }),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: '<html><body><div id="content"><script>var foo = true;</script></div></body></html>',
});

describe('Evaluates new scripts.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    it('foo is defined by new script in body', () => {
        const switcher = new Switcher({ containerSelector: '#content', linkSelector: '.link'});
        switcher.init();

        const link = document.querySelector('.link');
        link.click();

        expect(foo).toBeDefined();
    });
});
