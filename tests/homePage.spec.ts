import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
    await page.goto('https://automationexercise.com/');
});  

test('Verify each menu tab title and links are correct', async ({ page }) => {
    const menuTabs = [
        ' Home', ' Products', ' Cart', ' Signup / Login',
        ' Test Cases', ' API Testing', ' Video Tutorials',
        ' Contact us'
    ]

    const listItems = page.locator('.navbar-nav li');
    expect (await listItems.allInnerTexts()).toEqual(menuTabs);

    const expectedTabLinks = [
        {text: ' Home', href: '/'},
        {text: ' Products', href: '/products'},
        {text: ' Cart', href: '/view_cart'},
        {text: ' Signup / Login', href: '/login'},
        {text: ' Test Cases', href: '/test_cases'},
        {text: ' API Testing', href: '/api_list'},
        {text: ' Video Tutorials', href: 'https://www.youtube.com/c/AutomationExercise'},
        {text: ' Contact us', href: '/contact_us'},
    ]

    for (const [index, listItem] of expectedTabLinks.entries()) {
        const link = listItems.nth(index).locator('a');
        await expect(link).toHaveText(listItem.text);
        await expect(link).toHaveAttribute('href', listItem.href);
    }

})

test.afterAll( async ({ page }) => {         
    await page.close();     
}); 