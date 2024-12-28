import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.locators = {
            addToCartButton: By.id('add-to-cart-button'),
            productDetails: By.id('productDetails_feature_div'),
            imageGallery: By.id('imageBlock')
        };
    }

    async validateProductPage() {
        const validations = {
            addToCart: false,
            details: false,
            gallery: false
        };

        try {
            await this.findElement(this.locators.addToCartButton);
            validations.addToCart = true;
        } catch (error) {
            console.error('Add to Cart button not found');
        }

        try {
            await this.findElement(this.locators.productDetails);
            validations.details = true;
        } catch (error) {
            console.error('Product details not found');
        }

        try {
            await this.findElement(this.locators.imageGallery);
            validations.gallery = true;
        } catch (error) {
            console.error('Image gallery not found');
        }

        return validations;
    }
}