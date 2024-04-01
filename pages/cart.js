exports.CartPage = class CartPage {

    constructor(page) {
        this.page = page
        this.viewCart = page.getByRole('link', {name: 'Cart'});
        this.cartTable = page.locator('table#cart_info_table');
        this.productItem = page.locator('tbody > tr');
        this.productQuantity = page.locator('td.cart_quantity > button');
    }
}