const { expect } = require('@playwright/test')

exports.ProductsPage = class ProductsPage {
    
    constructor(page) {

        this.page = page
        this.productNavBtn = page.getByRole('link', {name: ' Products'});
        this.allProductsList = page.locator('div.features_items')
        this.productCard = page.locator('div.product-image-wrapper');
        this.productCardNames = page.locator('div.productinfo p');
        this.viewProductBtn = page.getByRole('link', {name: 'View Product'});
        this.addToCartBtn = page.locator('div.overlay-content a.add-to-cart'); // overlay button

        this.productInfo = page.locator('div.product-information');
        this.productName = page.locator('div.product-information h2');
        this.productCat = page.locator('div.product-information p').nth(0)
        this.productPrice = page.getByText(/Rs./);
        this.productQuantity = page.locator('input#quantity')
        this.prodAddToCart = page.getByRole('button', {name: 'Add to cart'})
        this.productAvail = page.locator('div.product-information p').nth(1)
        this.productCondition = page.locator('div.product-information p').nth(2)
        this.productBrand = page.locator('div.product-information p').nth(3)

        this.searchBar = page.locator('input#search_product')
        this.searchBtn = page.locator('button#submit_search')
        this.addToCartModal = page.locator('div.modal-content')
        this.continueBtn = page.locator('button.close-modal')
        this.viewCartBtn = page.getByRole('link', {name: 'View Cart'})
    }

    async gotoPage() {
        await this.page.goto('https://automationexercise.com')
    }

    async navigateToProducts() {
        await this.productNavBtn.click();
        await this.page.waitForURL(/products/); 
    }

    async viewAProduct (index) {
        await this.viewProductBtn.nth(index).click();
    }

    async checkProductDetails (name, category, price, avail, condition, brand) {
        await this.page.waitForURL(/product_details/);
        await expect(this.productName).toHaveText(name);
        await expect(this.productCat).toHaveText(category);
        await expect(this.productPrice).toHaveText(price);
        await expect(this.productAvail).toHaveText(avail);
        await expect(this.productCondition).toHaveText(condition);
        await expect(this.productBrand).toHaveText(brand);
    }

    async searchProduct (keyword) {
        await this.searchBar.fill(keyword);
        await this.searchBtn.click();
    }
}