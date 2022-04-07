import { browser, by, element } from 'protractor';

describe('Registro page', function() {
  beforeAll(function () {
    browser.manage().window().setSize(1600, 1000);
  })

  it('check form', async function () {
    browser.driver.get(browser.baseUrl + '/registro');
    // Fill inputs
    element(by.css("input[formControlName=email]")).sendKeys('test@example.com');
    element(by.css("input[formControlName=username]")).sendKeys('username');
    element(by.css("input[formControlName=password]")).sendKeys('test123');
    element(by.css("input[formControlName=confirmPassword]")).sendKeys('test123');

    // Push submit button
    //await pressButton('Entrar')
  });
})

async function pressButton(text:string) {
  await element(by.buttonText(text)).click();
  await browser.sleep(1000);
}
