'use strict';

/**
 * @namespace Error
 */

var server = require('server');
var system = require('dw/system/System');
var Resource = require('dw/web/Resource');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Error-Start : This endpoint is called when there is a server error
 * @name Base/Error-Start
 * @function
 * @memberof Error
 * @param {middleware} - consentTracking.consent
 * @param {httpparameter} - error - message to be displayed
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get/post
 */
server.use('Start', consentTracking.consent, function (req, res, next) {
    var format;
    if (!req.isHttpSecure() && req.httpHeaders.get('x-requested-with') === 'XMLHttpRequest') {
      var queryString = !empty(req.querystring) ? ('?' + req.querystring) : '';
      res.redirect('https://' + (req.httpHost || '') + (req.httpPath || '') + queryString);
    } else if (req.httpHeaders().get("x-requested-with") != null && req.httpHeaders().get("x-requested-with") === "XMLHttpRequest") {
      format = httpParameterMap.format.stringValue || "";
    }
    if (format === "json") {
      res.render('error/generalerrorjson');
    } else {
      res.render('error/generalerror');
    }
    
    next();
});

/**
 * Error-Forbidden : This endpoint is called when a shopper tries to access a forbidden content. The shopper is logged out and the browser is redirected to forbidden template
 * @name Base/Error-Forbidden
 * @function
 * @memberof Error
 * @param {middleware} - consentTracking.consent
 * @param {category} - non-sensitive
 * @param {serverfunction} - get
 */
server.get('Forbidden', consentTracking.consent, function (req, res, next) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    CustomerMgr.logoutCustomer(true);
    res.render('error/forbidden');
    next();
});

module.exports = server.exports();
