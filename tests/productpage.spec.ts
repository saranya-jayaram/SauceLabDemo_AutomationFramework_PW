import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';

test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});

test('swag labs logo present on product page',async({basePage})=>{
expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ productInfoPage }) => {
    expect(await productInfoPage.getPageFooter()).toHaveLength(3);
});
