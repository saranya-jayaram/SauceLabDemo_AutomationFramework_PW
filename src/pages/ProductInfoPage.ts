import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
    private readonly productprice: Locator;
    private readonly productnamestitle:Locator;
    private readonly cartButton:Locator;
    private readonly addToCart:Locator;
    private readonly removeCart:Locator;
     constructor(page: Page) {
        super(page);
        this.productnamestitle = page.locator('[data-test="inventory-item-name"]');
        this.productprice=page.locator('[data-test="inventory-item-price"]');
        this.addToCart=page.getByRole('button', { name: 'Add to cart' });
        this.cartButton=page.locator('.shopping_cart_link');
        this.removeCart=page.locator('[data-test="remove-sauce-labs-backpack"]');
        };

    async productInfoPageAddToCart(title:string):Promise<void>{
    const productcart=this.page.locator('[data-test="inventory-item"]',{has:this.page.getByText(title)});
    await productcart.getByRole('button').click();
}


    async clickAddToCartButtonChangedRemoved(title:string):Promise<string|null>{
        const productcart=this.page.locator('[data-test="inventory-item"]',{has:this.page.getByText(title)});
        return await productcart.getByRole('button').textContent();
        }
}

