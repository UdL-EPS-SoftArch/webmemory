// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    "features/*.feature"
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=1024x768']
    }
  },
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      'src/**/*.steps.ts',
      'src/steps/hooks.js'
    ],
    format: 'json:./e2e/protractor-cucumber-report.json',
    tags: ['~@ignore']
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  }
};
