import { Locator, Page } from "@playwright/test";
import{BasePage} from "./BasePage";


export class HomePage extends BasePage {
    //private
     private readonly logoutLink:Locator;
     private readonly openMenu:Locator;
     private readonly allLinksMenu:Locator;
     private readonly header:Locator
     
     //private readonly username:Locator; 
     //const..of the class init the locators
     constructor(page:Page){
         super(page);//to call the parent class ie the BasePage constructor
        this.logoutLink=page.getByRole('link',{name:'Logout'});
        this.openMenu=page.getByRole('button', { name: 'Open Menu' });
        this.allLinksMenu=page.locator('.bm-item.menu-item');
        //page.getByRole('link', { name: 'All Items' });
        this.header=page.getByText('Swag Labs', { exact: true });
       };

    
     async getHomePageTitle():Promise<string>{
        return await this.page.title();
     }

     async clickOpenMenuLink():Promise<void>{
        await this.openMenu.click();
    }

     async isLogoutLinkExist():Promise<boolean>{
        return await this.logoutLink.isVisible();
     }

     async getHomePageHeader():Promise<string[]>{
      return await this.header.allInnerTexts();
     }
     async getHomePageAllLinks():Promise<string[]>{
      return await this.allLinksMenu.allInnerTexts();
     }
};