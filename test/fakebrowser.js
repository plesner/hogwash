// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

(function (namespace) {

if (namespace.browser)
  return;
var browser = {};
namespace.browser = browser;

var onLoadedP = promise.Promise.empty();

/**
 * Doesn't do anything since we don't want to actually start the extension,
 * just call into it.
 */
browser.whenLoaded = function() {
  return onLoadedP;
};

/**
 * Return a fake response.
 */
browser.sendXhr = function() {
  return promise.Promise.empty();
}

})(this);
