// Copyright 2013 the Hogwash authors (see AUTHORS).
// Licensed under the Apache License, Version 2.0 (see LICENSE).

// Persistent settings.

(function(namespace) {

if (namespace.settings)
  return;
var settings = {};
namespace.settings = settings;

/**
 * A repository of raw settings values.
 */
function Repository() {
  this.loaded = false;
}

/**
 * Returns the value of the given setting using the specified value as the
 * default.
 */
Repository.prototype.getValue = function(name, dehfault) {
  return dehfault;
};

/**
 * The singleton repository instance.
 */
Repository.INSTANCE = new Repository();

/**
 * Wrapper around an individual setting.
 */
function Setting(name, dehfault) {
  this.name = name;
  this.dehfault = dehfault;
}

/**
 * Returns this setting's value in the given repo.
 */
Setting.prototype.getValue = function(repo) {
  return repo.getValue(this.name, this.dehfault);
};

/**
 * The list of users to check.
 */
settings.USERS = new Setting("users", ["rubinius", "plesner"]);

/**
 * Returns the root settings repository.
 */
settings.getRootRepository = function() {
  return Repository.INSTANCE;
}

})(this);
