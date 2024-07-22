import { test, expect } from "../fixtures/pomFixture.ts";
import userData from '../test-data/user-data.json';

test.beforeEach( async ({ loginPage }) => {
    await loginPage.gotoPage();
})
test.describe('Login Test Suite', () => {
    
    test('1. Verify login user with correct email and password', async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        await expect(loginPage.loginForm).toBeVisible();
        await loginPage.loginAccount(
            userData.users[2].email, 
            userData.users[2].password);
        await expect(loginPage.loggedInAs).toBeVisible();
    })
    
    test('2. Verify login user with incorrect email and password', async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        await loginPage.loginAccount(
            userData.users[2].email, 
            userData.users[2].incorrectPw);
        await expect(loginPage.errorMsg).toBeVisible();
    })
})

test.describe('Logout Test Suite', () => {
    test('3. Verify logout user flow', async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        await loginPage.loginAccount(
            userData.users[2].email, 
            userData.users[2].password);
        await expect(loginPage.loggedInAs).toBeVisible();
        await loginPage.logoutBtn.click()
        await expect(loginPage.loggedInAs).toBeHidden();
    }) 
})

test.afterAll( async ({ page }) => {         
    await page.close();     
}); 