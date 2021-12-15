'use strict';

/**
 * @namespace Cat
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var catFactService = require('*/cartridge/scripts/catFactService.js');


/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint test
 */
/**
 * Cat-Fact : Used to retrieve a cat
 * @name Cat-Fact
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */


server.get('Fact', server.middleware.include, cache.applyDefaultCache, function (req, res, next) {
    
  
    // var httpClient = new dw.net.HTTPClient();
   
    // httpClient.open('GET', 'https://catfact.ninja/fact');
    // httpClient.send();
    // var catFact = JSON.parse(httpClient.text);

    var catFact = catFactService.getCatFact();

    res.render('cat', {
      catFact: catFact
    });
    next();
});


module.exports = server.exports();
