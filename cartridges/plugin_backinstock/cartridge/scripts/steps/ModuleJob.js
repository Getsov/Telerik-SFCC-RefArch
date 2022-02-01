var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var ProductMgr = require("dw/catalog/ProductMgr");
var ProductAvailabilityModel = require("dw/catalog/ProductAvailabilityModel");
var Transaction = require('dw/system/Transaction');
var twilioService = require("../twilioService.js");

/**
 * Job for checking for product availability and if a givven product is available, use Twilio for sending SMS
 */
module.exports.execute = function () {
    var customObjectsIterator = CustomObjectMgr.getAllCustomObjects(
        "NotifyMeBackInStock"
    );

    while (customObjectsIterator.hasNext()) {
        var customObject = customObjectsIterator.next();
        var productId = customObject.custom.productId;
        var currentProduct = ProductMgr.getProduct(productId);
        var availability = currentProduct.availabilityModel.availability > 0;
        if (availability) {
            var phoneNumbers = customObject.custom.phoneNumbers;
            var response = null;
            var splittedPhoneNumbers = phoneNumbers.split(',');
            splittedPhoneNumbers.forEach((number) => {
                response = twilioService.twilioRequest(number, currentProduct.name);
            });
            if (response === 'OK') {
              Transaction.wrap(function () {
                CustomObjectMgr.remove(customObject);
              });
            }
        }
    }
};
