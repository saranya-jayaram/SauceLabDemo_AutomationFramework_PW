import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CartPage } from '../src/pages/CartPage';
import {CheckOutYourInfoPage} from '../src/pages/CheckOutYourInfoPage';


test.beforeEach(async({loginPage,basePage,cartPage ,productInfoPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
await productInfoPage.productInfoPageAddToCart("Sauce Labs Backpack");
await basePage.clickCartIcon();
await cartPage.cartPageDetailsValidation();
});


test('fill the details on the CheckOutYourInfoPage and continue order', async ({checkOutYourInfoPage})=> {
   await checkOutYourInfoPage.cartPageDetailsfilling();
   expect.soft (await checkOutYourInfoPage.getCurrentTitle()).toContain('/checkout-step-two.html');
   expect.soft (await checkOutYourInfoPage.checkoutOverviewPage()).toContain('Checkout: Overview');
 });
