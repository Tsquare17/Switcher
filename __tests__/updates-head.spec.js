import documentHtml from "../__mocks__/document"
import Switcher from "../src/Switcher"

const xhrMockClass = () => ({
    open: jest.fn(),
    send: jest.fn(function () {
        this.onreadystatechange();
    }),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: '<html><head><title>Switched</title><script>var foo = true;</script></head><body><div id="content"><div>switched</div></div></body></html>',
});

describe('Updates head.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    it('Title is updated', () => {
        const switcher = new Switcher({containerSelector: '#content', linkSelector: '.link'});
        switcher.init();

        const link = document.querySelector('.link');
        link.click();

        expect(document.querySelector('title').innerHTML).toEqual('Switched');
    });

    it('Script defining foo is added', () => {
        expect(foo).toBeDefined();
    });
});
