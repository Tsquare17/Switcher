import documentHtml from "../__mocks__/document"
import Switcher from "../src/Switcher"
const switcher = new Switcher('#content', '.link');

const xhrMockClass = () => ({
    open: jest.fn(),
    send: jest.fn(function () {
        this.onreadystatechange();
    }),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: '<body><div id="content"><div>switched</div></div></body>',
});

describe('Switcher tests.', () => {
    beforeAll(() => {
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
        window.XMLHttpRequest.DONE = 4;
    });

    beforeEach(() => {
        document = document.implementation.createHTMLDocument();
        document.body.innerHTML = documentHtml;
        console.log('newdoc')
    });

    it('Document is loaded', () => {
        expect(document.querySelector('#content').innerHTML).toEqual('<div>testing</div>');
    });

    it('Switches content on link click', () => {
        console.log('switches on link')
        // switcher.init();
        const link = document.querySelector('.link');
        // link.click();

        // expect(document.querySelector('#content').innerHTML).toEqual('<div>switched</div>');
    });

    it('Before switch event fires', () => {
        console.log('before switch')
        switcher.init();
        const link = document.querySelector('.link');
        let switched = false;
        let i = 1;
        // document.addEventListener('switcher.before', e => {
        //     if (i > 1) {
        //         // TODO: Figure out why the event is firing twice.
        //         console.log('fires event twice');
        //         return;
        //     }
        //     i++;
        //
        //     expect(document.querySelector('#content').innerHTML).toEqual('<div>testing</div>');
        //     switched = true;
        // });
        link.click();

        expect(switched).toEqual(true);
    });

    // it('After switch event fires', () => {
    //     switcher.init();
    //     const link = document.querySelector('.link');
    //     let switched = false;
    //     let i = 1;
    //     document.addEventListener('switcher.after', e => {
    //         if (i > 1) {
    //             // TODO: Figure out why the event is firing twice.
    //             return;
    //         }
    //         i++;
    //
    //         expect(document.querySelector('#content').innerHTML).toEqual('<div>switched</div>');
    //         switched = true;
    //     });
    //     link.click();
    //
    //     expect(switched).toEqual(true);
    // });
});
