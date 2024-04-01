import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products.js';
import { CartPage } from '../pages/cart.js';


test.beforeEach( async ({ page }) => {
    const Products = new ProductsPage(page);
    await Products.gotoPage()
})
test.describe('Products Page Test Suite', () => {
    
    test('1. Verify All Products and product detail page', async ({ page }) => {
        const Products = new ProductsPage(page);
        await Products.navigateToProducts()
        await Products.viewAProduct(0)
        await Products.checkProductDetails(
            'Blue Top', /Women > Tops/, /Rs. 500/,
            /In Stock/, /New/, /Polo/
        );
    })
    
    test('2. Verify Search Product functionality', async ({ page }) => {
        const Products = new ProductsPage(page);
        await Products.navigateToProducts();
        
        await Products.searchProduct('women');
        const names = await Products.productCardNames.all()
        for (const name of names) {
            await expect(name).toContainText(/Women/);
        }
    })

    test('3. Verify Add Products in Cart', async ({ page }) => {
        const Products = new ProductsPage(page);
        const Cart = new CartPage(page)
        await Products.navigateToProducts();
        
        // Add products
        const productToAdd = 2;
        for (let i=0; i<productToAdd; i++) {
            await Products.productCard.nth(i).hover();
            await Products.addToCartBtn.nth(i).click();
            await expect(Products.addToCartModal).toBeVisible();
            await Products.continueBtn.click();
        }
        
        await Cart.viewCart.click();
        await page.waitForURL(/view_cart/);
        await expect (Cart.productItem).toHaveCount(productToAdd);
    })

    test('4. Verify Product quantity in Cart', async ({ page }) => {
        const Products = new ProductsPage(page);
        const Cart = new CartPage(page)
        
        const quantity = "4";
        await Products.viewProductBtn.nth(0).click();
        await page.waitForURL(/product_details/);
        await Products.productQuantity.fill(quantity, {force: true});
        await Products.prodAddToCart.click()
        await expect(Products.addToCartModal).toBeVisible();
        await Products.viewCartBtn.click();

        await page.waitForURL(/view_cart/);
        await expect(Cart.productQuantity).toHaveText(quantity)
    })
    
    
})

test.afterAll(async ({ page }) => {         
    await page.close();
}); 


/* 

Test Case 8: Verify All Products and product detail page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible
7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that product detail is visible: product name, category, price, availability, condition, brand

Test Case 9: Search Product
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible

Test Case 12: Add Products in Cart
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Products' button
5. Hover over first product and click 'Add to cart'
6. Click 'Continue Shopping' button
7. Hover over second product and click 'Add to cart'
8. Click 'View Cart' button
9. Verify both products are added to Cart
10. Verify their prices, quantity and total price

Test Case 13: Verify Product quantity in Cart
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'View Product' for any product on home page
5. Verify product detail is opened
6. Increase quantity to 4
7. Click 'Add to cart' button
8. Click 'View Cart' button
9. Verify that product is displayed in cart page with exact quantity

*/