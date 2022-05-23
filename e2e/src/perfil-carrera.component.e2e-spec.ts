import {browser, by, element} from "protractor";

describe('Perfil-carrera page', function() {
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

  it('check charts', async function () {
    // Check that exists
    browser.driver.get(browser.baseUrl + '/perfil-carrera/17dc601c5bd62dcf00b45691da5eb944');
    let rendimientoChart = element(by.id("rendimientoChart"));
    expect(rendimientoChart.isPresent()).toBeTruthy();

    let historicalGradesChart = element(by.id("historicalGradesChart"));
    expect(historicalGradesChart.isPresent()).toBeTruthy();
  });

  it('If not logged, redirects to login', async function () {
    await pressButton('Publicar')
    expect(browser.getCurrentUrl()).toMatch(/\/login/)
    browser.navigate().back();
  });

  async function pressButton(text:string) {
    await element(by.buttonText(text)).click();
    await browser.sleep(1000);
  }


})
