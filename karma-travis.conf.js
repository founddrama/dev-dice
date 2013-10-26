// Karma configuration for Travis CI
module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    files: [
      'static/components/angular/*.js',
      'static/components/angular-mocks/*.js',
      'static/javascripts/*.js',
      'test/*-spec.js'
    ],

    exclude: [],

    preprocessors: {
      'static/javascripts/*.js': ['coverage']
    },

    reporters: ['progress', 'junit', 'coverage'],

    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,


    // Continuous Integration mode
    singleRun: true
  });
};
