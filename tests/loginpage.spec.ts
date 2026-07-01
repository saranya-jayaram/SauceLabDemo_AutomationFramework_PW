import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

//page objects
let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async({page})=>{
loginPage=new LoginPage(page);
await loginPage.goToLoginPage();
homePage=new HomePage(page);
});


test('Login page title test',async({})=>{
const pageTitle= await loginPage.getLoginPageTitle();
console.log('login page title',pageTitle);
expect(pageTitle).toBe('Swag Labs');
});

test('user is able to login test',async({})=>{
    await loginPage.doLogin('standard_user','secret_sauce');
    expect.soft(await homePage.getHomePageTitle()).toBe('Swag Labs');
});
