const {Builder} = require('selenium-webdriver');
require("chromedriver");

(async function helloSelenium() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.quit();
})();