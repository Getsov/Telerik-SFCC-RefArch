"use strict";

/**
 * @param {String} message
 * @returns {String} replaced with string "$$$$$$$$$$$$$$$$$$$"
 */
function filterLogMessage(message) {
    return "$$$$$$$$$$$$$$$$$$$";
}

module.exports = {
    getStarShip: getStarShip,
};

/**
 * Getting starship from SWAPI API
 */
function getStarShip() {
    var getSwapiService = dw.svc.LocalServiceRegistry.createService(
        "app_services_hw.swapi.getswapi",
        {
            createRequest: function (svc, args) {
                svc.setRequestMethod("GET");
                return args;
            },

            parseResponse: function (svc, client) {
                return client.text;
            },
        }
    );

    var response = JSON.parse(getSwapiService.call().object);
    response.cost_in_credits = filterLogMessage(response.cost_in_credits);

    return response;
}
