import { test as baseTest } from "@playwright/test"
import CartPage from "../pages/cartPage"
import LoginPage from "../pages/loginPage"
import ProductsPage from "../pages/productsPage"
import SignUpPage from "../pages/signUpPage"

type pages = {
    cartPage: CartPage
    loginPage: LoginPage
    productsPage: ProductsPage
    signUpPage: SignUpPage
}

const testPages = baseTest.extend<pages>({
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    },
    signUpPage: async ({ page }, use) => {
        await use(new SignUpPage(page))
    }
})

export const test = testPages
export const expect = testPages.expect