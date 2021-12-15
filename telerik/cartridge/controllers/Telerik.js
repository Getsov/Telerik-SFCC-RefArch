'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

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
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('telerik/home', {
      welcomeMsg : 'Welcome user'
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('Include', server.middleware.include, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('telerik/include', {
      welcomeMsg : 'Welcome user'
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('List', function (req, res, next) {
    var Site = require('dw/system/Site');
    // var query = req.
    res.render('telerik/searchResults', {
      welcomeMsg : 'Welcome user'
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();
