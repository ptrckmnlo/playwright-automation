import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.js';
import userData from '../test-data/user-data.json';
import { deflateSync } from 'zlib';

test.beforeEach( async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoPage();
})
test.describe('Login Test Suite', () => {
    
    test('1. Verify login user with correct email and password', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.gotoLoginPage();
        await expect(Login.loginForm).toBeVisible();
        await Login.loginAccount(
            userData.users[2].email, 
            userData.users[2].password);
        await expect(Login.loggedInAs).toBeVisible();
    })
    
    test('2. Verify login user with incorrect email and password', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.gotoLoginPage();
        await Login.loginAccount(
            userData.users[2].email, 
            userData.users[2].incorrectPw);
        await expect(Login.errorMsg).toBeVisible();
    })

})

test.describe('Logout Test Suite', () => {
    test('3. Verify logout user flow', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.gotoLoginPage();
        await Login.loginAccount(
            userData.users[2].email, 
            userData.users[2].password);
        await expect(Login.loggedInAs).toBeVisible();
        await Login.logoutBtn.click()
        await expect(Login.loggedInAs).toBeHidden();
    })
    
})

test.afterAll(async ({ page }) => {         
    await page.close();     
}); 
    
    



