const {awss3} = require('./awss3');
const objects = require('./objects');

module.exports = {
    awss3,
    ...objects
};