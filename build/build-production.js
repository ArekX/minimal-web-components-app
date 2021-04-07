
const build = require('./es-build');

console.log('Building for production...');
build('production').then(() => console.log('Done.'));

