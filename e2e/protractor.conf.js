// @ts-check
// Protractor configuration file, see link for more informationn
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    maxInstances: 5,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    // IMPORTANTE: Necesario ejecutar en modo headless para que
    // pasen los test en gihub actions.
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // @ts-ignore
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
