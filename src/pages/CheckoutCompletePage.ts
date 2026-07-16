import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class CheckoutCompletePage extends BasePage {

    //private Locators: 
    private readonly thankyoumessage: Locator;
    private readonly backHomeButton: Locator;
    
    
     constructor(page: Page) {
        super(page);
        this.thankyoumessage =page.getByRole('heading', { name: 'Thank you for your order!', level: 2 });
        this.backHomeButton=page.getByRole('button', { name: 'Back Home' });
       }

     
      async checkoutCompleteHomeButton():Promise<void> {
         await this.backHomeButton.click();
        }
}