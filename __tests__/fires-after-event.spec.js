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
window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
window.XMLHttpRequest.DONE = 4;

describe('After event.', () => {
    it('After switch event fires', () => {
        const switcher = new Switcher('#content', '.link');
        switcher.init();

        const link = document.querySelector('.link');
        let switched = false;
        document.addEventListener('switcher.after', e => {
            expect(document.querySelector('#content').innerHTML).toEqual('<div>switched</div>');
            switched = true;
        });
        link.click();

        expect(switched).toEqual(true);
    });
});
