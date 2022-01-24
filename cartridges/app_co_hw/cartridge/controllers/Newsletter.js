"use strict";

var server = require("server");
//Use the following for CSRF protection: add middleware in routes and hidden field on form
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

/**
 * Handle newsletter form subscription and save it to a custom object
 */
server.post("Handler", server.middleware.https, function (req, res, next) {
    var Transaction = require("dw/system/Transaction");
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var form = req.form;
    var error = false;
    if (!form) {
        error = true;
    }

    try {
        if (!form.email || !form.firstName || !form.lastName) {
            error = "Mandatory fields!";
        } else {
            Transaction.wrap(function () {
                var CustomObject = CustomObjectMgr.createCustomObject(
                    "NotificationForm",
                    form.email
                );
                CustomObject.custom.firstName = form.firstName;
                CustomObject.custom.lastName = form.lastName;
                CustomObject.custom.gender = form.gender;
            });
        }
    } catch (e) {
        error = e;
    }

    if (error) {
        res.json({
            error: true,
            logError: error,
        });
    } else {
        res.json({
            error: false,
            email: form.email,
        });
    }

    return next();
});

module.exports = server.exports();
