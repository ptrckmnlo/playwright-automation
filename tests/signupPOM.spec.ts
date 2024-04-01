import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signup.js';
import userData from '../test-data/user-data.json';
import prompt from '../test-data/prompt-data.json';



test.describe('Sign Up Test Suite', () => {

    test.beforeEach( async ({ page }) => {
        const SignUp = new SignUpPage(page);
        await SignUp.gotoPage();
    })

    test('1. Verify registration is successful', async ({ page }) => {
        // Sign Up
        const SignUp = new SignUpPage(page);
        await SignUp.gotoSignUp();
        await expect(SignUp.signUpForm).toBeVisible();
        await SignUp.signUpAcct(
            userData.users[0].name,
            userData.users[0].email
        )

        const newAcct = userData.signUpData[0]; 
        await SignUp.enterAcctInfo(
            newAcct.salutation,
            newAcct.password,
            newAcct.birthDay,
            newAcct.birthMonth,
            newAcct.birthYear,
        )
        await SignUp.enterAddressInfo(
            newAcct.firstName,
            newAcct.lastName,
            newAcct.company,
            newAcct.address,
            newAcct.country,
            newAcct.state,
            newAcct.city,
            newAcct.zip,
            newAcct.phoneNumber,
        )
        await SignUp.createAcctBtn.click();
        await expect(SignUp.acctSuccessMsg).toHaveText(prompt.success.accountCreateSuccess);
        await SignUp.continueBtn.click();
        await expect(SignUp.loggedInAs).toBeVisible();
    
        // Delete
        await SignUp.deleteBtn.click();
        await expect(SignUp.deleteSuccessMsg).toHaveText(prompt.success.deleteAccountSuccess)
        await SignUp.continueBtn.click();
        await expect(SignUp.signUpLogIn).toBeVisible();
    })
    
    test('2. Verify registration with existing email address', async ({ page }) => {
        const SignUp = new SignUpPage(page);
        await SignUp.gotoSignUp();
        await expect(SignUp.signUpForm).toBeVisible();
        await SignUp.signUpAcct(
            userData.users[2].name,
            userData.users[2].email
        );
        await expect(SignUp.emailExistMsg).toHaveText(prompt.error.emailAlreadyExist);
    })

    test.afterAll( async ({ page }) => {
        await page.close();
    });

})


