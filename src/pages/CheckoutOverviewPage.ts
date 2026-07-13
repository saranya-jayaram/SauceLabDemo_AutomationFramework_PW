import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {

    //private Locators: 
    private readonly summaryinfo: Locator;
    private readonly cartButton: Locator;
    private readonly finish:Locator;
    
     constructor(page: Page) {
        super(page);
        this.summaryinfo =page.locator('.summary_info');
        this.cartButton=page.locator('.shopping_cart_link');
        this.finish=page.getByRole('button', { name: 'Finish' });
     }


      async checkoutOverviewSummaryDetails():Promise<string>{
       return await this.summaryinfo.filter({hasText:'Payment Information'}).innerText();

 }
    }