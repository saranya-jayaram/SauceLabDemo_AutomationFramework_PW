import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductPage } from '../src/pages/ProductPage';


test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});

test('swag labs logo present on product page',async({basePage})=>{
expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ productPage }) => {
    expect(await productPage.getPageFooter()).toHaveLength(3);
});


test('verify product images count', async ({ productPage }) => {
    let imgCount = await productPage.getProductImagesCount();
    console.log('total images: ', imgCount);
    expect(imgCount).toBe(6);
    //act vs exp
});

test('verify product Information/Data', async ({productPage }) => {
   let actualProductInfoMap = await productPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    const expectedProductLists=new Map<string,string|number>([
        ['Sauce Labs Backpack','$29.99'],
         ['Sauce Labs Bike Light','$9.99'],
          ['Sauce Labs Bolt T-Shirt','$15.99'],
           ['Sauce Labs Fleece Jacket','$49.99'],
            ['Sauce Labs Onesie' ,'$7.99'],
             ['Test.allTheThings() T-Shirt (Red)','$15.99']

    ])

    expect.soft(actualProductInfoMap).toEqual(expectedProductLists);
  });

test('verify product link is visible and clickable', async ({ productPage }) => {
     await productPage.navigateToProductInfoPage("Sauce Labs Backpack");
});

    
