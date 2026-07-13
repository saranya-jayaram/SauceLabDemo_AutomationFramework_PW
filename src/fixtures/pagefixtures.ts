//fixtures can be used to maintain the state and page objects

//creating an exact replica of test inbuilt playwright testrunner  with the name as baseTest
import{test as baseTest}from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { HomePage } from '../pages/HomePage'; 
import { BasePage } from '../pages/BasePage';
import { ProductPage } from '../pages/ProductPage';
import { CsvHelper } from '../utils/CsvHelper';
import { ExcelHelper } from '../utils/ExcelHelper';
import { JsonHelper } from '../utils/JsonHelper';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { CartPage } from '../pages/CartPage';
import {CheckOutYourInfoPage} from '../pages/CheckOutYourInfoPage';
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'


//define types for page fixtures:
type pageFixtures={
    basePage: BasePage,
    loginPage:LoginPage,
    homePage:HomePage,
    productPage:ProductPage,
    productInfoPage: ProductInfoPage,
    cartPage:CartPage,
    checkOutYourInfoPage:CheckOutYourInfoPage,
    checkoutOverviewPage:CheckoutOverviewPage,
   testData:Record<string,string>[]
};

//extend playwright base test: similar to inheritance concept without classes (child class extending the parent class)
//   all pages will have 2 parameters in a function page an inbuilt one and use callback function which helps supply data
    export let test = baseTest.extend<pageFixtures>({
    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    //arrow function,use is a callback func help to supply data with use and supply as object
    loginPage:async({page},use)=>{ 
    let loginPage=new LoginPage(page);
    await use(loginPage);
},

//arrow function,use is a callback func help to supply data with use and supply as object

    homePage:async({page},use)=>{ 
    let homePage=new HomePage(page);
    await use(homePage);
},

     productPage: async ({ page }, use) => {
        let productPage = new ProductPage(page);
        await use(productPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    cartPage : async({ page }, use)=>{
        let cartPage=new CartPage(page);
        await use(cartPage);
    },
    
    checkOutYourInfoPage : async({ page }, use)=>{
        let checkOutYourInfoPage=new CheckOutYourInfoPage(page);
        await use(checkOutYourInfoPage);
    },

    checkoutOverviewPage : async({ page }, use)=>{
        let checkoutOverviewPage=new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },    
    

testData:async({},use)=>{
    let testData=CsvHelper.readCsv('src/data/loginData.csv');
    await use(testData);
},
});

export{expect}from '@playwright/test';

