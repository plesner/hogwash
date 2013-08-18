// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Utilities for interacting with github.

(function(namespace) {

var GITHUB_ROOT = "https://api.github.com";

if (namespace.github)
  return;
var github = {};
namespace.github = github;

github.buildUrl_ = buildUrl;

// Builds a url by replacing {X} placeholders with values taken from the given
// mapping. If a value is not in the mapping the placeholder is deleted.
function buildUrl(template, data) {
  return template.replace(/{\/?([a-z]*)}/g, function(match, name) {
    if (data.hasOwnProperty(name)) {
      return data[name];
    } else {
      return "";
    }
  })
}

/**
 * A wrapper around the github api root directory.
 */
function GitHub(json) {
  this.json = json;
}

/**
 * Returns data about the given user.
 */
GitHub.prototype.getUser = function(username) {
  var url = buildUrl(this.json.user_url, {"user": username});
  return comm
      .fetchJson(url)
      .thenConstruct(User);
};

/**
 * A wrapper around a github user.
 */
function User(json) {
  this.json = json;
  this.repos = null;
}

/**
 * Returns this user's repos.
 */
User.prototype.getRepos = function() {
  if (this.repos == null) {
    this.repos = comm
        .fetchJson(this.json.repos_url);
  }
  return this.repos;
};

// The singleton github root instance.
var rootP = comm
    .fetchJson(GITHUB_ROOT)
    .thenConstruct(GitHub);

// Requests information about the given user, 
github.getUser = function(username) {
  return rootP.lazyThen(function(root) {return root.getUser(username);});
}

})(this);
