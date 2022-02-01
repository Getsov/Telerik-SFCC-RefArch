"use strict";

/**
 * @namespace Twilio
 */

var server = require("server");

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");


/**
 * Twilio-Subscribe : The Twilio-Subscribe endpoint is the endpoint that gets hit when a shopper has submitted their phone number
 * for notification subscribe for a product without availability
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_pid - Hidden input field for the product id
 * @param {httpparameter} - dwfrm_phone - Input field for the shopper's phone number
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post("Subscribe", server.middleware.https, csrfProtection.validateAjaxRequest, function (req, res, next) {
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var Resource = require("dw/web/Resource");
    var Transaction = require("dw/system/Transaction");
    var URLUtils = require("dw/web/URLUtils");
    var formErrors = require('*/cartridge/scripts/formErrors');
    var notificationForm = server.forms.getForm("notification");
    var notification_CO = "NotifyMeBackInStock";
    var productId = req.form.pid;
    // form validation
    var notificationResult = CustomObjectMgr.getCustomObject(
        notification_CO,
        productId
    );
    if (!empty(notificationResult)) {
        if (notificationForm.valid) {
          Transaction.wrap(function () {
              var notificationEntry = CustomObjectMgr.getCustomObject(
                  notification_CO,
                  productId
              );
              var notificationPhones = notificationEntry.custom.phoneNumbers;
              var formPhone = notificationForm.phone.value;
              var splittedPhones = notificationPhones.split(',');
              var phoneAlreadyExists = splittedPhones.find(phone => phone === formPhone);
              if (!phoneAlreadyExists) {
                notificationEntry.custom.phoneNumbers = notificationEntry.custom.phoneNumbers + ',' + formPhone;
              } else {
                notificationForm.valid = false;
                notificationForm.phone.valid = false;
                notificationForm.phone.error = Resource.msg(
                    "error.message.not.unique",
                    "forms",
                    null
                );
                res.json({
                  success: false,
                  fields: formErrors.getFormErrors(notificationForm)
                });
                return next();
              }
              
          });
        }
        notificationForm.valid = false;
        notificationForm.phone.valid = false;
        notificationForm.phone.error = Resource.msg(
            "error.message.not.unique",
            "forms",
            null
        );
    } else {
      Transaction.wrap(function () {
        var notificationEntry = CustomObjectMgr.createCustomObject(
          notification_CO,
          productId
        );
        var formPhone = notificationForm.phone.value;
        notificationEntry.custom.phoneNumbers = formPhone.toString();
      });
    }

    res.json({
        success: true,
    });

    return next();
});

module.exports = server.exports();
