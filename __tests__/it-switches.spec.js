import documentHtml from "../__mocks__/document"
import Switcher from "../src/Switcher"

const xhrMockClass = () => ({
    open: jest.fn(),
    send: jest.fn(function () {
        this.onreadystatechange();
    }),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: '<body><div id="content"><div>switched</div></div></body>',
});

document.body.innerHTML = documentHtml;

describe('Switcher basic tests.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    it('Document is loaded', () => {
        expect(document.querySelector('#content').innerHTML).toEqual('<div>testing</div>');
    });

    it('Switches content on link click', () => {
        const switcher = new Switcher('#content', '.link');
        switcher.init();

        const link = document.querySelector('.link');
        link.click();

        expect(document.querySelector('#content').innerHTML).toEqual('<div>switched</div>');
    });
});
