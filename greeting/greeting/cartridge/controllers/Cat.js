'use strict';

/**
 * @namespace Cat
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');


/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint test
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */


server.get('Fact', server.middleware.include, cache.applyDefaultCache, function (req, res, next) {
    res.render('cat');
    next();
});


module.exports = server.exports();
