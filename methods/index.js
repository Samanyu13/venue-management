const methods = {};

methods.Authentication = require('./authentication');
methods.Calendar = require('./calendar');
methods.Incharge = require('./incharge');
methods.Admin = require('./admin');
methods.Venue = require('./venue');
methods.Events = require('./events');

module.exports = methods;