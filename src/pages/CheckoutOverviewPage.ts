import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {

    //private Locators: 
    private readonly summaryinfo: Locator;
    private readonly cartButton: Locator;
    private readonly finish:Locator;
    private map: Map<string ,string | number>;
    
     constructor(page: Page) {
        super(page);
        this.summaryinfo =page.locator('.summary_info');
        this.cartButton=page.locator('.shopping_cart_link');
        this.finish=page.getByRole('button', { name: 'Finish' });
        this.map = new Map<string,string | number>();
        
     }

     
      async checkoutOverviewSummaryDetails():Promise<Map<string,string | number>> {
        let paymentinfo = await this.summaryinfo.locator('[data-test="payment-info-value"]').innerText();
        let shippinginfo = await this.summaryinfo.locator('[data-test="shipping-info-value"]').innerText();
        let priceitemtotal= await this.summaryinfo.locator('[data-test="subtotal-label"]').innerText();
        let tax= await this.summaryinfo.locator('[data-test="tax-label"]').innerText();
        let total= await this.summaryinfo.locator('[data-test="total-label"]').innerText();
        this.map.set('Payment Info',paymentinfo);
        this.map.set('Shipping Info',shippinginfo);
        this.map.set('Item Total',priceitemtotal);
        this.map.set('Tax',tax);
        this.map.set('Total',total);
        return this.map 
}

async checkoutOverviewFinish():Promise<void> {
        await this.finish.click();
       }
}

       
