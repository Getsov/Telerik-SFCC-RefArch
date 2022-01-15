"use strict";

/**
 * @namespace Twilio
 */

var server = require("server");

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Checks if the phone number entered is correct format
 * @param {string} phone - phone number string to check if valid
 * @returns {boolean} Whether phone number is valid
 */
function validatePhone(phone) {
    var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return regex.test(phone);
}

/**
 * Account-SaveProfile : The Account-SaveProfile endpoint is the endpoint that gets hit when a shopper has edited their profile
 * @name Base/Account-SaveProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the shoppers's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the shopper's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_login_password  - Input field for the shopper's password
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post("Subscribe", server.middleware.https, function (req, res, next) {
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    var Resource = require("dw/web/Resource");
    var Transaction = require("dw/system/Transaction");
    var URLUtils = require("dw/web/URLUtils");
    var notificationForm = server.forms.getForm("notification");
    var notification_CO = "NotifyMeBackInStock";
    // form validation
    // var notificationResult = CustomObjectMgr.getCustomObject(notification_CO, '25695193M');
    // if(!empty(notificationResult)) {
    //   notificationForm.valid = false;
    //   notificationForm.phone.valid = false;
    //   notificationForm.phone.error = Resource.msg('error.message.not.unique', 'forms', null);
    // }


    // TODO - if product id is in the custom object, create new
    if (notificationForm.valid) {
        Transaction.wrap(function () {
            var notificationEntry = CustomObjectMgr.getCustomObject(
                notification_CO,
                "25695193M"
            );
            var notificationPhones = notificationEntry.custom.phoneNumbers;
            var formPhone = notificationForm.phone.value;
            notificationEntry.custom.phoneNumbers =
                notificationEntry.custom.phoneNumbers.concat(notificationForm.phone.value);
        });
    }

    // TODO - Redirect and handle success and error
    // TODO - JOBS and twilio integration
    res.json({
        success: true,
        redirectUrl: URLUtils.url("Home-Show").toString(),
    });

    return next();

    // var formErrors = require('*/cartridge/scripts/formErrors');

    // var profileForm = server.forms.getForm('profile');

    // // form validation
    // if (profileForm.customer.email.value.toLowerCase()
    //     !== profileForm.customer.emailconfirm.value.toLowerCase()) {
    //     profileForm.valid = false;
    //     profileForm.customer.email.valid = false;
    //     profileForm.customer.emailconfirm.valid = false;
    //     profileForm.customer.emailconfirm.error =
    //         Resource.msg('error.message.mismatch.email', 'forms', null);
    // }

    // var result = {
    //     firstName: profileForm.customer.firstname.value,
    //     lastName: profileForm.customer.lastname.value,
    //     phone: profileForm.customer.phone.value,
    //     email: profileForm.customer.email.value,
    //     confirmEmail: profileForm.customer.emailconfirm.value,
    //     password: profileForm.login.password.value,
    //     profileForm: profileForm
    // };
    // if (profileForm.valid) {
    //     res.setViewData(result);
    //     this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
    //         var formInfo = res.getViewData();
    //         var customer = CustomerMgr.getCustomerByCustomerNumber(
    //             req.currentCustomer.profile.customerNo
    //         );
    //         var profile = customer.getProfile();
    //         var customerLogin;
    //         var status;

    //         Transaction.wrap(function () {
    //             status = profile.credentials.setPassword(
    //                 formInfo.password,
    //                 formInfo.password,
    //                 true
    //             );

    //             if (status.error) {
    //                 formInfo.profileForm.login.password.valid = false;
    //                 formInfo.profileForm.login.password.error =
    //                     Resource.msg('error.message.currentpasswordnomatch', 'forms', null);
    //             } else {
    //                 customerLogin = profile.credentials.setLogin(
    //                     formInfo.email,
    //                     formInfo.password
    //                 );
    //             }
    //         });

    //         delete formInfo.password;
    //         delete formInfo.confirmEmail;

    //         if (customerLogin) {
    //             Transaction.wrap(function () {
    //                 profile.setFirstName(formInfo.firstName);
    //                 profile.setLastName(formInfo.lastName);
    //                 profile.setEmail(formInfo.email);
    //                 profile.setPhoneHome(formInfo.phone);
    //             });

    //             // Send account edited email
    //             accountHelpers.sendAccountEditedEmail(customer.profile);

    //             delete formInfo.profileForm;
    //             delete formInfo.email;

    //             res.json({
    //                 success: true,
    //                 redirectUrl: URLUtils.url('Account-Show').toString()
    //             });
    //         } else {
    //             if (!status.error) {
    //                 formInfo.profileForm.customer.email.valid = false;
    //                 formInfo.profileForm.customer.email.error =
    //                     Resource.msg('error.message.username.invalid', 'forms', null);
    //             }

    //             delete formInfo.profileForm;
    //             delete formInfo.email;

    //             res.json({
    //                 success: false,
    //                 fields: formErrors.getFormErrors(profileForm)
    //             });
    //         }
    //     });
    // } else {
    //     res.json({
    //         success: false,
    //         fields: formErrors.getFormErrors(profileForm)
    //     });
    // }
    // return next();
});

module.exports = server.exports();
