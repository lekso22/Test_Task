require('chromedriver');
const assert = require('assert');
const { By, until } = require('selenium-webdriver');

async function spinValidCombinations(driver, className, extraValues) {
    let row = await driver.findElements(By.css("tr."+className+"> td"));
    // Get combination number sequence only
    let combination = (await row[0].getText()).replace(/\+|\s/g, '');
    // Get win value for the combination
    let win = await row[1].getText();
    const testBox = await driver.findElement(By.id('testdata'));
    // Add extra values to combination to ensure that random numbers will not mess up the tests
    await testBox.sendKeys(combination + extraValues);
    //wait until spin button is enabled and then click
    const spinButton = await driver.wait(
        until.elementLocated(By.id("spinButton")),
        20000
    )
        .then(element => {
            return driver.wait(
                until.elementIsEnabled(element),
                20000
            );
        });
    spinButton.click();
    await driver.findElement(By.id("testdata")).clear();
    // Read how many points are in the win box
    const winbox = await driver.findElement(By.id("winbox")).getText();
    const score = winbox.match(/\d+/g).map(Number);
    // read classes of combination row
    const winRow = await driver.findElement(By.className(className));
    const winRowclasses = await winRow.getAttribute("class");
    return {
        score: score,
        win: win,
        classes: winRowclasses
    };
}

async function spinInValidCombinations(driver, inputStr) {
    await driver.findElement(By.id("testdata")).clear();
    const testBox = await driver.findElement(By.id('testdata'));
    await testBox.sendKeys(inputStr);
    const spinButton = await driver.wait(
        until.elementLocated(By.id("spinButton")),
        20000
    )
        .then(element => {
            return driver.wait(
                until.elementIsEnabled(element),
                20000
            );
        });
    spinButton.click();
    let winboxVisibility = await driver.findElement(By.id("winbox")).getCssValue("visibility");
    return winboxVisibility;
}

module.exports = {spinValidCombinations, spinInValidCombinations};