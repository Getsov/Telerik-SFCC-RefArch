'use strict';

var server = require('server');
server.extend(module.superModule);

/**
 * Extending Product-Show with notification form and content
 * if there is a product
 * @name Product-Show
 * @param {req} - request
 * @param {res} - response
 * @param {next}
 */
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('notify-in-stock');
    var notificationForm = server.forms.getForm('notification');
    notificationForm.clear();
    if (!viewData.product) {
      next();
    } else {
      viewData.notificationForm = notificationForm;
      viewData.content = content;
    }

    res.setViewData(viewData);
    next();
});
module.exports = server.exports();
