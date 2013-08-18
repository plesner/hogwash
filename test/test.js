// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Test utilities.

(function (namespace) {
  
if (namespace.test)
  return;
var test = {};
namespace.test = test;

function TestCase(name, thunk) {
  this.name = name;
  this.thunk = thunk;
  this.node = null;
}

/**
 * Returns all the tests defined on the global object in sorted order.
 */
function getAllTests() {
  // Extract all the tests.
  var names = [];
  for (var prop in namespace) {
    if (prop.substring(0, 4) != "test")
      continue;
    var value = namespace[prop];
    if (typeof(value) != "function")
      continue;
    names.push(prop);
  }
  // Sort them by name and build the result array.
  names.sort();
  var result = [];
  names.forEach(function(name) {
    result.push(new TestCase(name, namespace[name]));
  });
  return result;
}

/**
 * Display the test list before running the tests.
 */
function prepareTests(tests) {
  tests.forEach(function(test) {
    var node = document.createElement('div');
    node.innerText = test.name;
    document.body.appendChild(node);
    test.node = node;
  });
}

function executeTests(tests) {
  tests.forEach(function(test) {
    var thunk = test.thunk;
    try {
      thunk();
      test.node.style.color = "green";
    } catch (e) {
      test.node.style.color = "red";
    test.node.innerText += " (" + e + ")";
    }
  });
}

/**
 * Scans through the global namespace to collect all the tests and then
 * runs them.
 */
function runTests() {
  var tests = getAllTests();
  prepareTests(tests);
  executeTests(tests);
}

function AssertionFailedError(messageOpt) {
  Error(this);
  this.message = messageOpt;
}

AssertionFailedError.prototype.toString = function() {
  return this.message;
};

/**
 * Fails unless the given value is truthy.
 */
namespace.assertTrue = function(v, messageOpt) {
  if (!v) throw new AssertionFailedError(messageOpt);
}

/**
 * Fails if a and b are not standard equal.
 */
namespace.assertEquals = function(a, b) {
  namespace.assertTrue(a == b, a + " != " + b);
}

window.addEventListener("DOMContentLoaded", runTests);

})(this);
