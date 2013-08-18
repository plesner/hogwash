// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

(function (namespace) {

namespace.testBuildUrl = function() {
  var buildUrl = github.buildUrl_;
  assertEquals("http://a/b/c", buildUrl("http://{foo}/{bar}/{baz}",
    {foo: "a", bar: "b", baz: "c"}));
  assertEquals("http://a/b/", buildUrl("http://{foo}/{bar}/{baz}",
    {foo: "a", bar: "b"}));
  assertEquals("http://a/b", buildUrl("http://{foo}/{bar}{/baz}",
    {foo: "a", bar: "b"}));
}
  
})(this);
