// Karma configuration
// Generated on Mon Apr 16 2018 12:12:24 GMT+0200 (W. Europe Daylight Time)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/*.spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    mime: { 'text/x-typescript': ['ts','tsx'] },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
