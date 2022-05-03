import { browser, by, element } from 'protractor';

describe('Lista carreras page', function() {  let originalTimeout: number;

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

  it('check carrousel', async function () {
    browser.driver.get(browser.baseUrl + '/lista-carreras');
    element(by.css(".carousel-control-next")).click();
    element(by.css(".carousel-control-prev")).click();
  });

  it('check search bar', async function () {
    browser.driver.get(browser.baseUrl + '/lista-carreras');
    //Input some value
    element(by.id("search")).sendKeys('informática');
    //Screen shows expected career
    var career = element(by.cssContainingText('*', 'Ingeniería Informática'))
    expect(career.isPresent()).toBeTruthy();
  });
})

