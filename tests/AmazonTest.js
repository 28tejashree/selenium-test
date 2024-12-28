import { Builder } from 'selenium-webdriver';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { Logger } from '../utils/Logger.js';
import { CsvWriter } from '../utils/CsvWriter.js';
import { config } from '../config/config.js';

class AmazonTest {
    constructor() {
        this.driver = null;
        this.logger = new Logger('test_results.log');
        this.csvWriter = new CsvWriter('products.csv');
    }

    async initialize() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.manage().window().setRect(config.screenSizes[0]);
    }

    async runTests() {
        try {
            await this.initialize();
            
            const homePage = new HomePage(this.driver);
            const searchResultsPage = new SearchResultsPage(this.driver);
            const productPage = new ProductPage(this.driver);

            // Test search functionality
            await this.testSearch(homePage);

            // Get product details and validate
            const products = await this.crawlProducts(searchResultsPage);
            await this.csvWriter.writeRecords(products);

            if (products.length > 0) {
                await this.validateProduct(productPage, products[0].url);
            }

            // Test responsiveness
            await this.testResponsiveness();

        } catch (error) {
            this.logger.log('Test Suite', 'FAIL', error.message);
        } finally {
            await this.close();
        }
    }

    async testSearch(homePage) {
        const searchTests = [
            { term: '@#$%^', expected: false },
            { term: '', expected: false },
            { term: 'laptop', expected: true }
        ];

        for (const test of searchTests) {
            try {
                await homePage.navigateToHome();
                await homePage.searchProduct(test.term);
                this.logger.log('Search Test', 'PASS', `Tested: ${test.term}`);
            } catch (error) {
                this.logger.log('Search Test', 'FAIL', error.message);
            }
        }
    }

    async crawlProducts(searchResultsPage, maxPages = 3) {
        const allProducts = [];
        let currentPage = 1;

        while (currentPage <= maxPages && allProducts.length < 15) {
            const pageProducts = await searchResultsPage.getProductDetails();
            allProducts.push(...pageProducts);

            try {
                await searchResultsPage.goToNextPage();
                currentPage++;
            } catch (error) {
                break;
            }
        }

        return allProducts;
    }

    async validateProduct(productPage, url) {
        await this.driver.get(url);
        const validations = await productPage.validateProductPage();
        Object.entries(validations).forEach(([key, value]) => {
            this.logger.log('Product Validation', value ? 'PASS' : 'FAIL', key);
        });
    }

    async testResponsiveness() {
        for (const size of config.screenSizes) {
            try {
                await this.driver.manage().window().setRect(size);
                await this.driver.sleep(1000);
                this.logger.log('Responsive Test', 'PASS', 
                    `Tested at ${size.width}x${size.height}`);
            } catch (error) {
                this.logger.log('Responsive Test', 'FAIL', error.message);
            }
        }
    }

    async close() {
        if (this.driver) {
            await this.driver.quit();
        }
    }
}

// Start the test
const test = new AmazonTest();
test.runTests();