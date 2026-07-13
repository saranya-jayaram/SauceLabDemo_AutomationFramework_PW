import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    //private Locators: 
    private readonly itemscartlist: Locator;
    private readonly producttitlecartlist:Locator;
    protected readonly cartButton: Locator;
    private readonly cartprice:Locator;
    private readonly continueshopping:Locator;
    private readonly checkout:Locator;
    private readonly checkoutyourinfo:Locator;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.itemscartlist =page.locator('[data-test="cart-list"]');
        this.producttitlecartlist=page.locator('[data-test="inventory-item-name"]');
        this.cartButton=page.locator('.shopping_cart_link');
        this.cartprice=page.locator('[data-test="inventory-item-price"]');
        this.continueshopping=page.locator('[data-test="continue-shopping"]');
        this.checkout=page.locator('[data-test="checkout"]');
        this.checkoutyourinfo=page.locator('[data-test="title"]');
    }

    async cartPageDetailsValidation():Promise<void>{
      await this.checkout.click();
    }

    async checkOutYourInfo():Promise<string>{
        return this.checkoutyourinfo.innerText();
    }

}



   