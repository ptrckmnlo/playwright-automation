import { type Locator, type Page } from "@playwright/test"

export default class LoginPage {
    readonly page: Page
    readonly signUpLogIn: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    readonly loginForm: Locator
    readonly loggedInAs: Locator
    readonly errorMsg: Locator
    readonly logoutBtn: Locator
    

    constructor(page: Page) {
        this.page = page
        this.signUpLogIn = page.getByRole('link', {name: ' Signup / Login'});
        this.emailField = page.locator('input[data-qa="login-email"]');
        this.passwordField = page.locator('input[data-qa="login-password"]');
        this.loginBtn = page.getByRole('button', {name: 'Login'});
        this.loginForm = page.locator('.login-form');
        this.loggedInAs = page.getByText(/Logged in as/);
        this.errorMsg = page.getByText('Your email or password is incorrect!');
        this.logoutBtn = page.getByRole('link', {name: 'Logout'})
    }

    async gotoPage() {
        await this.page.goto('/')
    }

    async gotoLoginPage() {
        await this.signUpLogIn.click();
        await this.page.waitForURL(/login/);
    }

    async loginAccount(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click()
    }
} 