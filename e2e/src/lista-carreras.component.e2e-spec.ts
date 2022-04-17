import { browser, by, element } from 'protractor';

describe('Lista carreras page', function() {
  beforeAll(function () {
    browser.manage().window().setSize(1600, 1000);
  })

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

