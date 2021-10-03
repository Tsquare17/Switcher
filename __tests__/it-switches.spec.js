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


describe('Switcher basic tests.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    it('Document is loaded', () => {
        expect(document.querySelector('#content').innerHTML).toEqual('<div>testing</div>');
    });

    it('Switches content on link click', () => {
        const switcher = new Switcher({containerSelector: '#content'});
        switcher.init();

        const link = document.querySelector('.link');
        link.click();

        expect(document.querySelector('#content').innerHTML).toEqual('<div>switched</div>');
    });
});
