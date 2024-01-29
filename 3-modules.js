// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./4-names.js');
const utils = require('./5-utils.js');
const data = require('./6-alternativeflav.js');

utils.sayHi(names.adriane);
utils.sayHi(data.singlePerson.name);
require('./7-mindgrenade.js');
