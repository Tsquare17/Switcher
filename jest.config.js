module.exports = {
    testMatch: [
        '<rootDir>/**/__tests__/**/?(*.)(spec|test).js',
        '<rootDir>/**/?(*.)(spec|test).js'
    ],
    testEnvironment: 'jsdom',
    setupFiles: [
        "./__mocks__/document.js"
    ],
};
