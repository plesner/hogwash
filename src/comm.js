// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Communication, within the extension and over the web.

(function(namespace) {

if (namespace.comm)
  return;
var comm = {};
namespace.comm = comm;

/**
 * Fetches the specified path and parses the result as json. Returns a promise
 * for the result.
 */
comm.fetchJson = function(path) {
  return browser.sendXhr(path, "GET").then(JSON.parse);
};

/**
 * Sends an extension message.
 */
comm.sendExtensionMessage = function() {
  var result = new promise.Promise();
  var argList = Array.prototype.slice.call(arguments);
  browser.sendExtensionMessage(argList, function(response) {
    if (response.hasOwnProperty('value')) {
      result.fulfill(response.value);
    } else {
      result.fail(response.error);
    }
  });
  return result;
}

})(this);
