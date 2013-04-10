var __ = require('underscore');

var dataOptions = [
      'CouchDB',
      'Datomic',
      'FileMaker Pro',
      'Infobright',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'SQLite'
    ],
    backEndOptions = [
      'ASP.NET MVC',
      'Clojure/Noir',
      'Flex',
      'Groovy/Grails',
      'Java/Struts',
      'Node.js/Express',
      'PHP/Drupal',
      'PHP/Zend',
      'Python/Django',
      'Ruby/Rails',
      'Scala/Play'
    ],
    frontEndOptions = [
      'AngularJS',
      'Backbone.js',
      'Batman.js',
      'Closure',
      'dojo',
      'ExtJS',
      'GWT',
      'Java Swing',
      'jQuery',
      'Kendo UI',
      'KnockoutJS',
      'MooTools',
      'Prototype',
      'YUI',
      'Zepto'
    ],
    vcsOptions = [
      'Bazaar',
      'CVS',
      'Git',
      'Mercurial',
      'Perforce',
      'Subversion',
      'Visual SourceSafe'
    ];

function Die(options) {
  this.options = options;
}

Die.prototype = {
  constructor: Die,
  roll: function() {
    return __.first(__.shuffle(this.options));
  }
};

exports.Die      = Die;
exports.backEnd  = backEndOptions;
exports.frontEnd = frontEndOptions;
exports.db       = dataOptions;
exports.vcs      = vcsOptions;