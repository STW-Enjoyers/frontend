import { browser, by, element } from 'protractor';

describe('Login page', function() {
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

  it('check form', async function () {
    browser.driver.get(browser.baseUrl + '/login');
    // Fill inputs
    element(by.css("input[formControlName=email]")).sendKeys('test@example.com');
    element(by.css("input[formControlName=password]")).sendKeys('test123');
    // Push submit button
    //await pressButton('Entrar')

    //TODO: uncomment when user with email test@example.com and password test123 exists in backend

    // Login takes some time, so wait until it's done
    // and check if it redirect to correct page
    // return browser.driver.wait(function () {
    //  return browser.driver.getCurrentUrl().then(function (url) {
    //    return /index/.test(url);
    //  });
    // }, 10000);
  });
})

async function pressButton(text:string) {
  await element(by.buttonText(text)).click();
  await browser.sleep(1000);
}
