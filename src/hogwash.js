// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Main entry-point.

(function(namespace) {

function reportError(error) {
  console.log(String(error));
}

function updateBadge(repos) {
  chrome.browserAction.setBadgeText({
    text: String(repos.length)
  });
  console.log(repos);
}

/**
 * Wrapper around the extension.
 */
function Hogwash() {
  this.repo = settings.getRootRepository();
}

function flatten(arrays) {
  return arrays.concat.apply([], arrays);
}

/**
 * Main entry-point method.
 */
Hogwash.prototype.main = function() {
  var users = settings.USERS.getValue(this.repo);
  // Fetch the list of repos for each user in the users list.
  var userReposPs = [];
  users.forEach(function(user) {
    var userReposP = github
      .getUser(user)
      .lazyThen(function(user) { return user.getRepos() });
    userReposPs.push(userReposP);
  });
  // Join the promises for individual users and flatten the result so we get
  // a flat array of all the repos across users.
  var allRepos = promise.Promise
    .join(userReposPs)
    .then(flatten);
  allRepos
    .then(function(v) { console.log(v); })
    .onFailed(reportError);
};

function onLoad() {
  new Hogwash().main();
}

// Register the entry-point to be called when everything is ready.
browser
  .whenLoaded()
  .then(onLoad)
  .onFailed(reportError);
  
})(this);
