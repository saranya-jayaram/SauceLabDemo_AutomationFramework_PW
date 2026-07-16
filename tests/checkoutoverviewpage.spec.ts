import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CartPage } from '../src/pages/CartPage';
import {CheckOutYourInfoPage} from '../src/pages/CheckOutYourInfoPage';


test.beforeEach(async({loginPage,basePage,cartPage ,productInfoPage,checkOutYourInfoPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
await productInfoPage.productInfoPageAddToCart("Sauce Labs Backpack");
await basePage.clickCartIcon();
await cartPage.cartPageDetailsValidation();
await checkOutYourInfoPage.cartPageDetailsfilling();
});



test('verify overviewsummaryDetails', async ({checkoutOverviewPage }) => {
   let actualSummaryInfoMap = await checkoutOverviewPage.checkoutOverviewSummaryDetails();
    console.log('Actual summary details: ', actualSummaryInfoMap);
    const expectedSummaryInfoMap=new Map<string,string|number>([
        ['Payment Info','SauceCard #31337'],
        ['Shipping Info','Free Pony Express Delivery!'],
        ['Item Total','Item total: $29.99'],
        ['Tax','Tax: $2.40'],
        ['Total','Total: $32.39']
    ]);
    console.log('Expected  summary details: ', expectedSummaryInfoMap);
    expect(actualSummaryInfoMap).toEqual(expectedSummaryInfoMap);
    await checkoutOverviewPage.checkoutOverviewFinish();
});

