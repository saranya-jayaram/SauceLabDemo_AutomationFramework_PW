
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{
    private readonly username:Locator;
     private readonly password:Locator;
     private readonly loginBtn:Locator;
     private readonly logo:Locator;
     private readonly loginErrorMessage: Locator; 

     //constructor is always public and the concept is called encapsulation
    constructor(page:Page){
        super(page); //to call the parent class ie the BasePage constructor
        this.username=page.getByRole('textbox',{name:'Username'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.loginBtn=page.getByRole('button',{name:'Login'});
        this.logo=page.getByText('Swag Labs', { exact: true });
        this.loginErrorMessage=page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out.', level: 3 });
    };


    //public page actions/methods/behaviour

    async goToLoginPage():Promise<void>{
        await this.page.goto("https://www.saucedemo.com/");
    }

    async getLoginPageTitle():Promise<string>{
        return await this.page.title();
    }

    async doLogin(username:string,password:string):Promise<void>{
        console.log(`username: ${username}: ${password}`);
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isInvalidLoginErrorDisplayed():Promise<boolean>{
   return await this.loginErrorMessage.isVisible();
}
};

