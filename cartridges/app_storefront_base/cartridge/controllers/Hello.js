'use strict';

/**
 * @namespace Hello
 */

var server = require('server');

server.get('World', function (req, res, next) {
    res.json({
      test: 'ala-bala'
    });
    next();
});

module.exports = server.exports();
