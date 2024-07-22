import { test, expect } from '../fixtures/pomFixture.ts';
import userData from '../test-data/user-data.json';
import prompt from '../test-data/prompt-data.json';

test.describe('Sign Up Test Suite', () => {

    test.beforeEach( async ({ signUpPage }) => {
        await signUpPage.gotoPage();
    })

    test('1. Verify registration is successful', async ({ signUpPage }) => {
        // Sign Up
        await signUpPage.gotoSignUp();
        await expect(signUpPage.signUpForm).toBeVisible();
        await signUpPage.signUpAcct(
            userData.users[0].name,
            userData.users[0].email
        )

        const newAcct = userData.signUpData[0]; 
        await signUpPage.enterAcctInfo(
            newAcct.salutation,
            newAcct.password,
            newAcct.birthDay,
            newAcct.birthMonth,
            newAcct.birthYear,
        )
        await signUpPage.enterAddressInfo(
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
        await signUpPage.createAcctBtn.click();
        await expect(signUpPage.acctSuccessMsg).toHaveText(prompt.success.accountCreateSuccess);
        await signUpPage.continueBtn.click();
        await expect(signUpPage.loggedInAs).toBeVisible();
    
        // Delete
        await signUpPage.deleteBtn.click();
        await expect(signUpPage.deleteSuccessMsg).toHaveText(prompt.success.deleteAccountSuccess)
        await signUpPage.continueBtn.click();
        await expect(signUpPage.signUpLogIn).toBeVisible();
    })
    
    test('2. Verify registration with existing email address', async ({ signUpPage }) => {
        await signUpPage.gotoSignUp();
        await expect(signUpPage.signUpForm).toBeVisible();
        await signUpPage.signUpAcct(
            userData.users[2].name,
            userData.users[2].email
        );
        await expect(signUpPage.emailExistMsg).toHaveText(prompt.error.emailAlreadyExist);
    })

    test.afterAll( async ({ page }) => {
        await page.close();
    });

})


