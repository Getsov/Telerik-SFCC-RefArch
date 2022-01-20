"use strict";

/**
 * If a givven product is available from ModuleJob, send an SMS to the givven phone number with the product name
 * @param {String} phoneNumber - Phone number for sending SMS to
 * @param {String} productName - Product name, that is available
 */
function twilioRequest(phoneNumber, productName) {
    var twilioFromNumber = dw.system.Site.current.preferences.custom.twilioFromNumber;
    var encoding = dw.crypto.Encoding;

    var concatenatedBody = 'To=' + phoneNumber + '&Body=' + productName + ' is back in stock&From=' + twilioFromNumber;
    var postTwilioService = dw.svc.LocalServiceRegistry.createService(
        "plugin_backinstock.twilio.subscribe",
        {
            createRequest: function (svc, args) {
                // Default request method is post
                // No need to setRequestMethod
                svc.addHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                );
                return args;
            },
            parseResponse: function (svc, client) {
                return client;
            }
        }
    );
    var response = postTwilioService.call(concatenatedBody).status;
    return response;
}

module.exports = {
    twilioRequest: twilioRequest
};
