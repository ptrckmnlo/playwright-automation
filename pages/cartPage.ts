import { type Locator, type Page } from "@playwright/test"

export default class CartPage {
    readonly page: Page
    readonly viewCart: Locator
    readonly cartTable: Locator
    readonly productItem: Locator
    readonly productQuantity: Locator

    constructor(page: Page) {
        this.page = page
        this.viewCart = page.getByRole('link', {name: 'Cart'});
        this.cartTable = page.locator('table#cart_info_table');
        this.productItem = page.locator('tbody > tr');
        this.productQuantity = page.locator('td.cart_quantity > button');
    }
}