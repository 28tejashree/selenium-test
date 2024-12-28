import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { config } from '../config/config.js';

export class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.locators = {
            searchBox: By.id('twotabsearchtextbox'),
            searchButton: By.id('nav-search-submit-button')
        };
    }

    async navigateToHome() {
        await this.navigateTo(config.baseUrl);
    }

    async searchProduct(searchTerm) {
        const searchBox = await this.findElement(this.locators.searchBox);
        await searchBox.clear();
        await searchBox.sendKeys(searchTerm);
        await searchBox.submit();
    }
}