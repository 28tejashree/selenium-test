# Selenium Test: Amazon E-commerce Automation Testing

## Description
This project automates crawling and testing for Amazon India's e-commerce site. It includes basic crawling, functional validation, and responsiveness testing.

## Features
- Crawling product details: name, price, rating, and URL.
- Functional validation: Add to Cart, product details, and image gallery.
- Multi-page crawling.
- Responsiveness testing by simulating different screen sizes.

## Prerequisites
- Node.js installed
- Selenium WebDriver and browser drivers (e.g., chromedriver) installed.

## Setup
1. Clone the repository:
   ```bash
   git clone [<repository_url>](https://github.com/28tejashree/selenium-test.git)
   cd selenium-test
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests
Execute tests:
```bash
node tests/AmazonTest.js
```
or 
```bash
npm test
```

## Outputs
- Test logs: `test_results.log`
- CSV with product details: `products.csv`

## Assumptions and Constraints
- Tested on Chrome.
- Screen sizes for responsiveness tests are predefined.
