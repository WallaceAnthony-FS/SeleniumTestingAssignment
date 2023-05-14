const { Builder, By, Key, until } = require("selenium-webdriver")
require("dotenv").config()

describe("Assignment", () => {
    let driver;

    beforeAll(async () => {
        driver = new Builder().forBrowser("safari").build()
        await driver.manage().window().maximize()
    })

    afterAll(async () => {
        await driver.quit()
    })

    const setDelay = async (time) => {
        await driver.sleep(time)
    }

    it("should open homepage - and check the title is 'Home'", async () => {
        await setDelay(1000)
        await driver.get(process.env.url)
        await driver.wait(until.titleIs("Home"), 1000)
    })

    it("should open contact page - and check the title is 'Contact Us'", async () => {
        await setDelay(1000)
        await driver.get(process.env.url + "/contact")
        await driver.wait(until.titleIs("Contact Us"), 1000)
    })

    it("should sign up for more info via email - and check the message is 'More info coming to ' and then the email address entered", async () => {
        await setDelay(1000)
        await driver.get(process.env.url + "/contact")
        await driver.findElement(By.id("formInput")).sendKeys(process.env.EMAIL)
        await setDelay(1000)
        await driver.findElement(By.id("formSubmit")).click()
        await driver.wait(until.elementLocated(By.id("formMessage")), 1000)
        const message = await driver.findElement(By.id("formMessage")).getText()
        expect(message).toEqual("More info coming to " + process.env.EMAIL)
    })

})