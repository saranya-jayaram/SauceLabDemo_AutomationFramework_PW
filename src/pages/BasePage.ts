import {Locator, Page } from "@playwright/test";

export class BasePage{
    protected readonly page:Page;
    protected readonly logo: Locator;
    
    
    constructor(page:Page){
        this.page=page;
        this.logo = page.getByText('Swag Labs', { exact: true });
        
    }

    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    //page level generic methods:
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentTitle(): string {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }


}

