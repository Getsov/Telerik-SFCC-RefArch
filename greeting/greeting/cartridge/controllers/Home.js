'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var HookMgr = require('dw/system/HookMgr');
server.extend(module.superModule);

/**
 * Home-Show : This is a custom controller, which appends on Home-Show
 * @name Greeting/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace('Show', consentTracking.consent, cache.applyDefaultCache, function(req, res, next) {
  var result = {
    school: 'Telerik',
    program: 'SFCC',
    language: 'JavaScript',
    type: 'eCommerce',
  };
  res.setViewData(result);
  if (HookMgr.hasHook("add.to.view.data")) {
    res.setViewData(HookMgr.callHook(
      "add.to.view.data",
      "addToViewData"
    ));
  }
  next();
});

module.exports = server.exports();
