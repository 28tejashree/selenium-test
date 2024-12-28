import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { config } from '../config/config.js';

export class SearchResultsPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.locators = {
            productContainer: By.css('.s-result-item[data-component-type="s-search-result"]'),
            productName: By.css('.a-text-normal'),
            productPrice: By.css('.a-price .a-offscreen'),
            productRating: By.css('.a-icon-star-small .a-icon-alt'),
            productUrl: By.css('.a-link-normal.s-no-outline'),
            nextButton: By.css('.s-pagination-next')
        };
    }

    async getProductDetails(maxProducts = 5) {
        await this.waitForElement(this.locators.productContainer, config.timeout);
        const products = [];
        const productElements = await this.findElements(this.locators.productContainer);

        for (let i = 0; i < Math.min(maxProducts, productElements.length); i++) {
            try {
                const element = productElements[i];
                const product = {
                    name: await element.findElement(this.locators.productName).getText(),
                    price: await element.findElement(this.locators.productPrice).getText(),
                    rating: await element.findElement(this.locators.productRating).getText(),
                    url: await element.findElement(this.locators.productUrl).getAttribute('href')
                };
                products.push(product);
            } catch (error) {
                console.error(`Error extracting product ${i + 1}:`, error);
            }
        }
        return products;
    }

    async goToNextPage() {
        const nextButton = await this.findElement(this.locators.nextButton);
        await nextButton.click();
        await this.waitForElement(this.locators.productContainer, config.timeout);
    }
}