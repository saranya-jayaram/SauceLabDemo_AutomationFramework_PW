import {test,expect} from "../src/fixtures/pagefixtures";
import { LoginPage } from "../src/pages/LoginPage";



test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();

});


test('Login page title test',async({loginPage})=>{
const pageTitle= await loginPage.getLoginPageTitle();
console.log('login page title',pageTitle);
expect(pageTitle).toBe('Swag Labs');

});

test('user is able to login test',async({loginPage,homePage})=>{
    await loginPage.doLogin('standard_user','secret_sauce');
    expect.soft(await homePage.getHomePageTitle()).toBe('Swag Labs');
});

test('user error validation test for locked user',async({loginPage,page})=>{
     await loginPage.doLogin('locked_out_user','secret_sauce');
     await page.waitForTimeout(2000);
    expect.soft(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    let error=await loginPage.isInvalidLoginErrorDisplayedMessage();
    expect.soft(error).toContain('Epic sadface: Sorry, this user has been locked out.');
});