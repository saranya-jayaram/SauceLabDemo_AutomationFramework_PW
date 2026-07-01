import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { time } from "node:console";

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async({page})=>{
loginPage=new LoginPage(page);
await loginPage.goToLoginPage();
await loginPage.doLogin('standard_user','secret_sauce');
homePage=new HomePage(page);
});

test('Home page title test',async({})=>{
const pageTitle= await homePage.getHomePageTitle();
console.log('home page title',pageTitle);
expect(pageTitle).toBe('Swag Labs');
});

test('logout link exist test',async({page})=>{
 await homePage.clickOpenMenuLink(); 
 await page.waitForTimeout(3000);
//  let vis = await homePage.isLogoutLinkExist();
//  console.log(vis);
expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page get all links from the open menu bar test',async({page})=>{
 await homePage.clickOpenMenuLink(); 
 await page.waitForTimeout(3000);
 let allLinksMenu=await homePage.getHomePageAllLinks();
 console.log('all links on open menu bar',allLinksMenu);
 expect.soft(allLinksMenu).toHaveLength(4);
 expect.soft(allLinksMenu).toEqual([
    'All Items',
    'About',
    'Logout',
    'Reset App State'
 ])  
});