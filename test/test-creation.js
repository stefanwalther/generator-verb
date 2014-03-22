/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('docs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('docs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // dotfiles
      '.gitignore',
      '.gitattributes',

      // Runtime config
      '.jshintrc',
      '.bowerrc',
      '.verbrc.yml',
      '.travis.yml',

      // Package manifests
      'bower.json',
      'package.json',

      // Readme
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});