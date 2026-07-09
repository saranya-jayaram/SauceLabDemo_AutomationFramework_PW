import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage {

    //private Locators: 
    private readonly header: Locator;
    private readonly productpagetitle:Locator;
    private readonly menucontainer:Locator;
    protected readonly cartButton: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly footerSocialLinks:Locator;
    private map: Map<string, string | number>;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByText('Swag Labs', { exact: true });
        this.menucontainer=page.locator('.bm-burger-button');
        this.cartButton=page.locator('.shopping_cart_link');
        this.productpagetitle=page.getByText('Products', { exact: true });
        this.productImages = page.locator(".inventory_item_img a");
        this.productMetaData = page.locator('[data-test="inventory-item-desc"]');
        this.productPricing = page.locator(".inventory_item_price");
        this.footerSocialLinks=page.locator('.social li');
        this.map = new Map<string, string | number>();
    };

async getProductHeader():Promise<string>{
    return await this.header.innerText();
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
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }


  // Brand: 
    // Product Code: 
    // Reward Points: 
    // Availability: 
    private async getProductMetaData(): Promise<void> {
        let metData = await this.productMetaData.allInnerTexts();
        for (let data of metData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricingData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }

}

