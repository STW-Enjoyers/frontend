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

  it('check inputs', async function () {
    browser.driver.get(browser.baseUrl + '/login');
    element(by.css("input[formControlName=email]")).sendKeys('test@example.com');
    element(by.css("input[formControlName=password]")).sendKeys('test123');
  });
})

async function pressButton(text:string) {
  await element(by.buttonText(text)).click();
  await browser.sleep(1000);
}
