import { type Locator, type Page } from "@playwright/test"

export default class SignUpPage {
    readonly page: Page
    readonly signUpLogIn: Locator
    readonly signUpForm: Locator
    readonly signUpName: Locator
    readonly signUpEmail: Locator
    readonly signUpBtn: Locator
    readonly loggedInAs: Locator
    readonly emailExistMsg: Locator
    readonly title: Locator
    readonly passwordField: Locator
    readonly selectBirthDay: Locator
    readonly selectBirthMonth: Locator
    readonly selectBirthYear: Locator
    readonly newsletterConsent: Locator
    readonly receivedOfferConsent: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly companyField: Locator
    readonly addressField: Locator
    readonly countryField: Locator
    readonly stateField: Locator
    readonly cityField: Locator
    readonly zipCodeField: Locator
    readonly mobileNumberField: Locator
    readonly createAcctBtn: Locator
    readonly acctSuccessMsg: Locator
    readonly continueBtn: Locator
    readonly deleteBtn: Locator
    readonly deleteSuccessMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.signUpLogIn = page.getByRole('link', {name: ' Signup / Login'});
        this.signUpForm = page.locator('.signup-form');
        this.signUpName = page.locator('input[data-qa="signup-name"]');
        this.signUpEmail = page.locator('input[data-qa="signup-email"]');
        this.signUpBtn = page.getByRole('button', {name: 'Signup'});
        this.loggedInAs = page.getByText('Logged in as');
        this.emailExistMsg = page.getByText('Email Address already exist!');

        /* Account Info */
        this.title = page.locator('div[data-qa="title"]'); // 2 radio button
        this.passwordField = page.locator('input[data-qa="password"]');
        this.selectBirthDay = page.locator('select[data-qa="days"]');
        this.selectBirthMonth = page.locator('select[data-qa="months"]');
        this.selectBirthYear = page.locator('select[data-qa="years"]')
        this.newsletterConsent = 
            page.getByLabel('Sign up for our newsletter!');
        this.receivedOfferConsent = 
            page.getByLabel('Receive special offers from our partners!');

        /* Address Info */
        this.firstName = page.locator('input[data-qa="first_name"]');
        this.lastName = page.locator('input[data-qa="last_name"]');
        this.companyField = page.locator('input[data-qa="company"]');
        this.addressField = page.locator('input[data-qa="address"]');
        this.countryField = page.locator('select[data-qa="country"]');
        this.stateField = page.locator('input[data-qa="state"]');
        this.cityField = page.locator('input[data-qa="city"]');
        this.zipCodeField = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberField = page.locator('input[data-qa="mobile_number"]');
        this.createAcctBtn = page.getByRole('button', {name: 'Create Account'})

        /* Success State/Delete State */ 
        this.acctSuccessMsg = 
            page.getByText('Congratulations! Your new account has been successfully created!');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');

        this.deleteBtn = page.getByRole('link', {name:'Delete Account'});
        this.deleteSuccessMsg = 
            page.getByText('Your account has been permanently deleted!');
    }

    async gotoPage() {
        await this.page.goto('/')
    }

    async gotoSignUp() {
        await this.signUpLogIn.click();
        await this.page.waitForURL(/login/);
    }

    async signUpAcct(name, email) {
        await this.signUpName.fill(name);
        await this.signUpEmail.fill(email);
        await this.signUpBtn.click();
    }

    async enterAcctInfo(salutation, password, day, month, year) {
        await this.page.waitForURL(/signup/);
        await this.title.nth(salutation).check()
        await this.passwordField.fill(password);
        await this.selectBirthDay.selectOption(day);
        await this.selectBirthMonth.selectOption(month);
        await this.selectBirthYear.selectOption(year);
    }

    async enterAddressInfo(fname, lname, company, address, country, state, city, zipCode, number) {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.companyField.fill(company);
        await this.addressField.fill(address);
        await this.countryField.selectOption(country);
        await this.stateField.fill(state);
        await this.cityField.fill(city);
        await this.zipCodeField.fill(zipCode);
        await this.mobileNumberField.fill(number)
    }

}