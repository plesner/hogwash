// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Popup controller.

(function (namespace) {

if (namespace.popup)
  return;
var popup = {};
namespace.popup = popup;

function onLoad() {
  document.write("foo");
}

browser.whenLoaded().then(onLoad);

})(this);
