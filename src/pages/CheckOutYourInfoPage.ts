import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckOutYourInfoPage extends BasePage {

    //private Locators: 
    private readonly firstname: Locator;
    private readonly lastname:Locator;
    private readonly postalcode:Locator
    private readonly cartButton: Locator;
    private readonly continue:Locator;
    private readonly checkoutoverview:Locator;
    

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.firstname =page.getByRole('textbox', { name: 'First Name' });
        this.lastname=page.getByRole('textbox', { name: 'Last Name' });
        this.postalcode=page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.cartButton=page.locator('.shopping_cart_link');
        this.continue=page.getByRole('button', { name: 'Continue' });
        this.checkoutoverview=page.getByText('Checkout: Overview', { exact: true });
        }

      async cartPageDetailsfilling():Promise<void>{
      await this.firstname.fill('Sar');
      await this.lastname.fill('Jay');
      await this.postalcode.fill('74847');
      await this.continue.click();
    }

    getCurrentTitle(): string {
        return this.page.url();
    }
       async checkoutOverviewPage():Promise<string>{
        return this.checkoutoverview.innerText();
       } 


}

