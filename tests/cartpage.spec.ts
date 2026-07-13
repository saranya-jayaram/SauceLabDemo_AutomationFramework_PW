import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CartPage } from '../src/pages/CartPage';


test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});



test('verify product added and checkout', async ({ basePage,cartPage ,productInfoPage})=> {
   await productInfoPage.productInfoPageAddToCart("Sauce Labs Backpack");
   await basePage.clickCartIcon();
   await cartPage.cartPageDetailsValidation();
   expect (await cartPage.checkOutYourInfo()).toContain('Checkout: Your Information');
 });
 