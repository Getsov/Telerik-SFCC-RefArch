"use strict";

/**
 * @namespace Swapi
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var swapiService = require("*/cartridge/scripts/swapiService.js");

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint test
 */
/**
 * Swapi-Star : Used to retrieve a starship
 * @name Swapi-Star
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get(
    "Star",
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var starShip = swapiService.getStarShip();

        res.render("starship", {
            starShip: starShip,
        });
        next();
    }
);

module.exports = server.exports();
