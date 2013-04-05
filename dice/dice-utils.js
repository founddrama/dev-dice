var __ = require('underscore');

var dataOptions = [
      'CouchDB',
      'Datomic',
      'FileMaker',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Redis'
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
      'dojo',
      'ExtJS',
      'jQuery',
      'MooTools',
      'Prototype',
      'YUI'
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

exports.Die = Die;
exports.backEnd = backEndOptions;
exports.frontEnd = frontEndOptions;
exports.db = dataOptions;