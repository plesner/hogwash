// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Browser abstraction layer.

(function (namespace) {

if (namespace.browser)
  return;
var browser = {};
namespace.browser = browser;

/**
 * The singleton browser-is-loaded promise.
 */
var whenLoadedP = promise.Promise.empty();

/**
 * Returns a promise that resolves with an arbitrary value when the browser
 * is done loading.
 */
browser.whenLoaded = function() {
  return whenLoadedP;
};

// Schedule the loaded promise to be fulfilled.
window.addEventListener("DOMContentLoaded", function() {
  whenLoadedP.fulfill(null);
});

/**
 * Send an xml http request for the given path. Returns a promise for the
 * response text.
 */
browser.sendXhr = function(path, type) {
  var result = promise.Promise.empty();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4)
      result.fulfill(xhr.responseText);
  };
  xhr.open(type || "GET", path, true);
  xhr.send();
  return result;
};

})(this);
