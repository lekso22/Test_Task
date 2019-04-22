require('chromedriver');
const assert = require('assert');
const { Builder, Key, By, until } = require('selenium-webdriver');
const {spinValidCombinations, spinInValidCombinations} = require('./testFunctions');

describe('UI Tests', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        // open the page
        await driver.get('file:///C:/Users/lekso/Desktop/Test_Task/Test_Task.html');
    });

    it('Test 1:Checks that correct page is loaded', async function () {
        let title = await driver.getTitle();
        assert.equal(title, 'Test Task');
    });

    it('Test 2: Checks for combination 111', async function () {
        const result = await spinValidCombinations(driver, "win111", "23");
        // check that designated score matches won points
        assert.equal(result.score, result.win);
        // check that combination row has gone bold and italic
        assert(result.classes.includes("achievement"));
    });

    it('Test 3: Checks for combination 1111', async function () {
        const result = await spinValidCombinations(driver, "win1111", "2");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });

    it('Test 4: Checks for combination 11111', async function () {
        const result = await spinValidCombinations(driver, "win11111", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });

    it('Test 5: Checks for combination 222', async function () {
        const result = await spinValidCombinations(driver, "win222", "13");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });

    it('Test 6: Checks for combination 2222', async function () {
        const result = await spinValidCombinations(driver, "win2222", "1");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 7: Checks for combination 22222', async function () {
        const result = await spinValidCombinations(driver, "win22222", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    
    it('Test 8: Checks for combination 333', async function () {
        const result = await spinValidCombinations(driver, "win333", "12");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    
    it('Test 9: Checks for combination 3333', async function () {
        const result = await spinValidCombinations(driver, "win3333", "1");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 10: Checks for combination 33333', async function () {
        const result = await spinValidCombinations(driver, "win33333", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 11: Checks for combination 444', async function () {
        const result = await spinValidCombinations(driver, "win444", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 12: Checks for combination 4444', async function () {
        const result = await spinValidCombinations(driver, "win4444", "1");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });

    it('Test 13: Checks for combination 44444', async function () {
        const result = await spinValidCombinations(driver, "win44444", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 14: Checks for combination 555', async function () {
        const result = await spinValidCombinations(driver, "win555", "12");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 15: Checks for combination 5555', async function () {
        const result = await spinValidCombinations(driver, "win5555", "1");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });
    it('Test 16: Checks for combination 55555', async function () {
        const result = await spinValidCombinations(driver, "win55555", "");
        assert.equal(result.score, result.win);
        assert(result.classes.includes("achievement"));
    });

    it('Test 17: Checks for non-winner combination', async function () {
        const result = await spinInValidCombinations(driver, "12345");
        //check that non-winning combinetions do not end up winning
        assert.equal(result, "hidden");
    })
    it('Test 18: Checks for out of range combination', async function () {
        const result = await spinInValidCombinations(driver, "77777");
        assert.equal(result, "hidden");
    })
    it('Test 19: Checks for string input', async function () {
        const result = await spinInValidCombinations(driver, "aaaaa");
        assert.equal(result, "hidden");
    })
    // close the browser
    after(() => driver && driver.quit());
})

