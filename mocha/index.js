/*
 * generator-verb <https://github.com/jonschlinkert/generator-verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var util = require('util');
var yeoman = require('yeoman-generator');
var pkg = {};


var VerbGenerator = module.exports = function VerbGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'mocha';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
  var self = this;

  var fn = {};
  fn.shortname = require('app-name');
  fn.namify = require('namify');
  this._.mixin(fn);

  this.readJSON = function() {
    var filepath = path.join.apply(path, arguments);
    return JSON.parse(self.readFileAsString(filepath));
  };
};

util.inherits(VerbGenerator, yeoman.generators.NamedBase);


VerbGenerator.prototype.testFiles = function testFiles() {
  if (fs.existsSync('package.json')) {
    pkg = this.readJSON('package.json');
  }
  this.homepage = pkg.homepage ? pkg.homepage : '';
  this.authorname = pkg.author.name ? pkg.author.name : '';
  var repo = '';
  if (pkg.repository && typeof pkg.repository === 'string') {
    repo = pkg.repository;
  } else if (pkg.repository && typeof pkg.repository === 'object') {
    repo = url.parse(pkg.repository.url).path;
  }
  this.username = repo.split('/').filter(Boolean)[0];

  if(this.name === 'mocha') {
    this.template('test.js', 'test/test.js');
  }

  if(this.name === 'test') {
    this.template('test.js', 'test.js');
  }
};