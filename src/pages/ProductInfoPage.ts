import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
    private readonly productprice: Locator;
    private readonly productpagetitle:Locator;
    private readonly cartButton:Locator;
     constructor(page: Page) {
        super(page);
        this.productpagetitle = page.locator('[data-test="inventory-item-name"]');
        this.productprice=page.locator('[data-test="inventory-item-price"]');
        this.cartButton=page.locator('.shopping_cart_link');
    };
}