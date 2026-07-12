import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';
import { ProductPage } from '../src/pages/ProductPage';

test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});

test('verify product link is visible and clickable and added to the cart', async ({ productInfoPage })=> {
    await productInfoPage.productInfoPageAddToCart("Sauce Labs Backpack");
    // await productInfoPage.clickAddToCart();
      expect (await productInfoPage.clickAddToCartButtonChangedRemoved("Sauce Labs Backpack")).toContain('Remove');
     });
 