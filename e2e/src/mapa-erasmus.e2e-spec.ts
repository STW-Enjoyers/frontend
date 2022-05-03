import { browser, by, element } from 'protractor';

describe('Erasmus map page', function() {
  let originalTimeout: number;

  beforeAll( function () {
    // Set window size
    browser.manage().window().setSize(1600, 1000);
    // Increase timeout to avoid github actions timeout error
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })
  afterEach(function() {
    // Restore timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('check map', async function () {
    browser.driver.get(browser.baseUrl + '/mapa-erasmus');
    let map = element(by.id("map"));
    expect(map.isPresent()).toBeTruthy();
  });
})

