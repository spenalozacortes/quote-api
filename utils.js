const getRandomElement = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getIndexById = (id, arr) => arr.findIndex(element => element.id === Number(id));

module.exports = {
    getRandomElement,
    getIndexById
};