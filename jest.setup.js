// jest.setup.js
global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
    clearTimeout(id);
};
