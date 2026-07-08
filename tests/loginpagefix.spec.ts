import {test,expect} from "../src/fixtures/pagefixtures";
import { LoginPage } from "../src/pages/LoginPage";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";



test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();

});


test('Login page title test',async({loginPage})=>{
const pageTitle= await loginPage.getLoginPageTitle();
console.log('login page title',pageTitle);
expect(pageTitle).toBe('Swag Labs');

});

test('user is able to login test',async({loginPage,homePage})=>{
    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);
    expect.soft(await homePage.getHomePageTitle()).toBe('Swag Labs');
});

test('user error validation test for locked user',async({loginPage,page})=>{
     await loginPage.doLogin('locked_out_user','secret_sauce');
     await page.waitForTimeout(2000);
    expect.soft(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    let error=await loginPage.isInvalidLoginErrorDisplayedMessage();
    expect.soft(error).toContain('Epic sadface: Sorry, this user has been locked out.');
});



//Data driven approach part 1 -sequence mode--only 1 test is running with test data one by one using testData from fixture
test('login to app using wrong credentials with data driven approach test',async({ loginPage , testData})=>{
    for(let row of testData){
       await loginPage.doLogin(row.username,row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});


//run all the credentails parallely as 3 different tests
let testData= CsvHelper.readCsv('src/data/loginData.csv');
for(let row of testData){
    test(`invalid login test - ${row.username}- ${row.password}`,async ({loginPage})=>{
      await loginPage.doLogin(row.username,row.password);
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();  
    });
};


//MS excel - office latest
//xlsx format
//maintenance
let loginTestData = ExcelHelper.readExcel('src/data/SauceLabOpenCartTestData.xlsx', 'Sheet1');
for (let row of loginTestData) {
    test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};


let sauceLoginJSONData = JsonHelper.readJson('src/data/SauceLabLoginData.json');
for (let row of sauceLoginJSONData) {
      test(`invalid SauceLogin with JSON data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};






