'use strict';

/**
 * If the resource to add is not already in the resource array then add it to the array
 * @param {Array} resourceArray - Either the scripts or styles array to which you want to add the resource src to.
 */
function getCatFact() {

  var getCatFactService = dw.svc.LocalServiceRegistry.createService("http.catfact.getcatfact", {

    createRequest: function(svc, args) {
      // svc.addHeader('', '');
      svc.setRequestMethod('GET');
      return args;
    },
    parseResponse: function(svc, client) { 
      return client.text;
    }
  });

  var response = JSON.parse(getCatFactService.call().object);

  return response;
}

module.exports = {
  getCatFact : getCatFact
};
