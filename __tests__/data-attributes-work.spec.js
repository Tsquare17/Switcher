import documentHtml from "../__mocks__/document"
import Switcher from "../src/Switcher"

const xhrMockClass = () => ({
    open: jest.fn(),
    send: jest.fn(function () {
        this.onreadystatechange();
    }),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: '<html><body><div id="content"><div>switched</div></div></body></html>',
});

describe('Switcher data attributes work.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    it('data-switcher="false" disables switcher on link', () => {
        const switcher = new Switcher();
        switcher.init();

        const link = document.querySelector('.disabled-link');
        link.click();

        expect(document.querySelector('#content').innerHTML).toEqual('<div>testing</div>');
    });
});
