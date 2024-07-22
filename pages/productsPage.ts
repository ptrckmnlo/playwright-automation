import { type Locator, type Page, expect } from "@playwright/test"

export default class ProductsPage {
    readonly page: Page
    readonly productNavBtn: Locator
    readonly allProductsList: Locator
    readonly productCard: Locator
    readonly productCardNames: Locator
    readonly viewProductBtn: Locator
    readonly addToCartBtn: Locator
    readonly productInfo: Locator
    readonly productName: Locator
    readonly productCat: Locator
    readonly productPrice: Locator
    readonly productQuantity: Locator
    readonly prodAddToCart: Locator
    readonly productAvail: Locator
    readonly productCondition: Locator
    readonly productBrand: Locator
    readonly searchBar: Locator
    readonly searchBtn: Locator
    readonly addToCartModal: Locator
    readonly continueBtn: Locator
    readonly viewCartBtn: Locator
    
    constructor(page: Page) {

        this.page = page

        /* Product List page */
        this.productNavBtn = page.getByRole('link', {name: ' Products'});
        this.allProductsList = page.locator('div.features_items')
        this.productCard = page.locator('div.product-image-wrapper');
        this.productCardNames = page.locator('div.productinfo p');
        this.viewProductBtn = page.getByRole('link', {name: 'View Product'});
        this.addToCartBtn = page.locator('div.overlay-content a.add-to-cart'); // overlay button

        /* Product Details page */
        this.productInfo = page.locator('div.product-information');
        this.productName = page.locator('div.product-information h2');
        this.productCat = page.locator('div.product-information p').nth(0)
        this.productPrice = page.getByText(/Rs./);
        this.productQuantity = page.locator('input#quantity')
        this.prodAddToCart = page.getByRole('button', {name: 'Add to cart'})
        this.productAvail = page.locator('div.product-information p').nth(1)
        this.productCondition = page.locator('div.product-information p').nth(2)
        this.productBrand = page.locator('div.product-information p').nth(3)

        /* Add to cart */
        this.searchBar = page.locator('input#search_product')
        this.searchBtn = page.locator('button#submit_search')
        this.addToCartModal = page.locator('div.modal-content')
        this.continueBtn = page.locator('button.close-modal')
        this.viewCartBtn = page.getByRole('link', {name: 'View Cart'})
    }

    async gotoPage() {
        await this.page.goto('/')
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