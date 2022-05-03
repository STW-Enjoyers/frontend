import { browser, by, element } from 'protractor';

describe('Home page', function() {
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

  it('check buttons', async function () {
    browser.get(browser.baseUrl);

    await pressButton('Ver carreras')
    expect(browser.getCurrentUrl()).toMatch(/\/lista-carreras/)
    browser.navigate().back();

    await pressButton('Notas de corte')
    expect(browser.getCurrentUrl()).toMatch(/\/filtrador-notas/)
    browser.navigate().back();

    await pressButton('Erasmus')
    expect(browser.getCurrentUrl()).toMatch(/\/mapa-erasmus/)
  });

  it('check images', async function () {
    browser.get(browser.baseUrl);
    let image = element(by.id("adabyron"));
    expect(image.isPresent()).toBeTruthy();
  });
})

async function pressButton(text:string) {
  await element(by.buttonText(text)).click();
  await browser.sleep(1000);
}
