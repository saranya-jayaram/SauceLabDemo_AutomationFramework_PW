import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CartPage } from '../src/pages/CartPage';
import {CheckOutYourInfoPage} from '../src/pages/CheckOutYourInfoPage';
import { CheckoutOverviewPage } from '../src/pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';


test.beforeEach(async({loginPage,basePage,cartPage ,productInfoPage,checkOutYourInfoPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
await productInfoPage.productInfoPageAddToCart("Sauce Labs Backpack");
await basePage.clickCartIcon();
await cartPage.cartPageDetailsValidation();
await checkOutYourInfoPage.cartPageDetailsfilling();
});



test('verify overviewsummaryDetails', async ({checkoutOverviewPage, checkoutCompletePage }) => {
    checkoutOverviewPage.checkoutOverviewFinish();
    expect(await checkoutCompletePage.thankyoumessage.textContent()).toBe('Thank you for your order!');
    expect(await checkoutCompletePage.backHomeButton).toBeVisible();
    checkoutCompletePage.checkoutCompleteHomeButton();
    });

