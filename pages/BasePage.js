import { By, until } from 'selenium-webdriver';

export class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateTo(url) {
        await this.driver.get(url);
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }

    async waitForElement(locator, timeout) {
        return await this.driver.wait(until.elementLocated(locator), timeout);
    }
}