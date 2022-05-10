import {browser, by, element} from "protractor";

describe('Perfil-carrera page', function() {
  let originalTimeout: number;

  beforeAll( function () {
    // Set window size
    browser.manage().window().setSize(1600, 1000);
    // Increase timeout to avoid github actions timeout error
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    /* TODO: COMPLETAR
     Tested degree profile
     let grade = {
     nota:9.105,
     centro: "Facultad de Economía y Empresa",
      estudio:" Administración y Dirección de Empresas",
      localidad:"Zaragoza",
      cupo:"General (EvAU-PAU/ CFGS/ Acred. UNED/ Bach. ext. hom.)",
      curso:2021,
      idCarrera:"17dc601c5bd62dcf00b45691da5eb944"
     }
     browser.executeScript('localStorage.setItem("grade", "{"nota":9.105}");');
    */
  })
  afterEach(function() {
    // Restore timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  /*it('check charts', async function () {
    // Check that exists
    browser.driver.get(browser.baseUrl + '/perfil-carrera');
    let rendimientoChart = element(by.id("rendimientoChart"));
    expect(rendimientoChart.isPresent()).toBeTruthy();

    let historicalGradesChart = element(by.id("historicalGradesChart"));
    expect(historicalGradesChart.isPresent()).toBeTruthy();
  });

  it('check input a comment', async function () {
    await pressButton('Publicar')
    expect(browser.getCurrentUrl()).toMatch(/\/registro/)
    browser.navigate().back();
  });

  async function pressButton(text:string) {
    await element(by.buttonText(text)).click();
    await browser.sleep(1000);
  }
  */

})
