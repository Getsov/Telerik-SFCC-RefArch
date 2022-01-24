"use strict";

var server = require("server");
server.extend(module.superModule);

/**
 * Extending Account-SaveProfile with country of residence and interests
 * @name Account-SaveProfile
 * @param {req} - request
 * @param {res} - response
 * @param {next}
 */
server.append("SaveProfile", function (req, res, next) {
    var viewData = res.getViewData();
    var Transaction = require("dw/system/Transaction");
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var Resource = require("dw/web/Resource");
    var URLUtils = require("dw/web/URLUtils");
    var accountHelpers = require("*/cartridge/scripts/helpers/accountHelpers");
    var customer = CustomerMgr.getCustomerByCustomerNumber(
        req.currentCustomer.profile.customerNo
    );
    var profile = customer.getProfile();
    var formErrors = require("*/cartridge/scripts/formErrors");
    var profileForm = server.forms.getForm("profile");

    viewData.countryResidence = profileForm.customer.countryResidence.value;
    viewData.interests = profileForm.customer.interests.value;

    Transaction.wrap(function () {
        profile.custom.residence = profileForm.customer.countryResidence.value;
        profile.custom.interests = profileForm.customer.interests.value;
    });

    res.setViewData(viewData);
    next();
});
module.exports = server.exports();
