import { browser, by, element } from 'protractor';

describe('Filtrador notas page', function() {
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

  it('check filter bar', async function () {
    browser.driver.get(browser.baseUrl + '/filtrador-notas');
    //Input some value
    element(by.id("filter")).sendKeys('4');
    //Screen shows expected career
    var filterAll = element(by.cssContainingText('*', 'No hemos encontrado ninguna carrera - disculpa'))
    expect(filterAll.isPresent()).toBeTruthy();
  });

  /*
  it('check select dropdown', async function () {
    browser.driver.get(browser.baseUrl + '/filtrador-notas');
    //Open dropdown
    element(by.id("select")).click();
    //Screen shows expected career
    element(by.css("#first [value='Yahoo']")).click();
  });
  */
})