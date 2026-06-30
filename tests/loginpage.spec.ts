import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";


test('Login page title test',async({page})=>{
await page.pause();
let loginPage=new LoginPage(page);
await loginPage.goToLoginPage();
const pageTitle= await loginPage.getLoginPageTitle();
console.log('login page title',pageTitle);
expect(pageTitle).toBe('Swag Labs');
});