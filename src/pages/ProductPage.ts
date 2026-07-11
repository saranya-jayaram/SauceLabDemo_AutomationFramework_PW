import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class ProductPage extends BasePage {

    //private Locators: 
    private readonly header: Locator;
    private readonly productpagetitle:Locator;
    private readonly menucontainer:Locator;
    protected readonly cartButton: Locator;
    private readonly productslist:Locator;
    private readonly productnamestitle:Locator;
    private readonly productImages: Locator;
    private readonly footerSocialLinks:Locator;
    private map: Map<string,string | number>;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByText('Swag Labs', { exact: true });
        this.menucontainer=page.locator('.bm-burger-button');
        this.cartButton=page.locator('.shopping_cart_link');
        this.productslist=page.locator('[data-test="inventory-item"]');
        this.productpagetitle=page.getByText('Products', { exact: true });
        this.productnamestitle=page.locator('[data-test="inventory-item-name"]');
        this.productImages = page.locator(".inventory_item_img a");
        this.footerSocialLinks=page.locator('.social li');
        this.map = new Map<string,string | number>();
    };

async getProductHeader():Promise<string>{
    return await this.header.innerText();
}

async getProductNameTitle():Promise<string>{
    return await this.productnamestitle.innerText();
}
async isMenuButtonContainerVisible(): Promise<boolean> {
        return this.menucontainer.isVisible();
    }
 async getProductPageTitle(): Promise<string> {
        return await this.productpagetitle.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }

    async getPageFooter(): Promise<string[]> {
        return await this.footerSocialLinks.allInnerTexts();
    }

      /**
     * 
     * @returns this method is returning the actual product data: header, images, metadata, pricing data
     */
  async getProductInfo(): Promise<Map<string,string | number>> {

    for(let i=0;i< await this.productslist.count();i++){
        let title = await this.productslist.nth(i).locator('[data-test="inventory-item-name"]').innerText();
        let price = await this.productslist.nth(i).locator('.inventory_item_price').innerText();
        this.map.set(title,price)
    }
    return this.map 
   }

   async navigateToProductInfoPage(title:string):Promise<void>{
    return await this.productnamestitle.filter({hasText:title}).click();
 }
}
