import { browser, by, element } from 'protractor';

describe('Erasmus map page', function() {
  beforeAll( function () {
    browser.manage().window().setSize(1600, 1000);
  })

  it('check map', async function () {
    browser.driver.get(browser.baseUrl + '/mapa-erasmus');
    let map = element(by.id("map"));
    expect(map.isPresent()).toBeTruthy();
  });
})

