import { Page } from '@playwright/test';

export class NavigationPage {
    private page: Page;

    // Selectors
    private suppliersAndCustomersMenu = "//a[@class='sc-ftvSup jAqibW']";
    private suppliersAndSitesOption = "//a[normalize-space()='Suppliers & Sites']";
    private purchasesMenu = "//a[@class='sc-ftvSup iZLhCw']";
    private purchasesTradingOption = "//a[normalize-space()='Purchases (Trading)']";
    private salesMenu = "//div[@permission='OPERATION_TRADING_SELL']//a[@class='sc-ftvSup eQcDlm']";
    private salesOptions = "//a[@class='item']";
    private inventoryMenu = "//div[@permission='WAREHOUSE_INBOUNDS,WAREHOUSE_INVENTORY,WAREHOUSE_OUTBOUNDS']//a[@class='sc-ftvSup eQcDlm']";

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToSuppliersAndSites() {
        await this.page.hover(this.suppliersAndCustomersMenu);
        await this.page.click(this.suppliersAndSitesOption);
    }

    async navigateToPurchasesTrading() {
        await this.page.hover(this.purchasesMenu);
        await this.page.click(this.purchasesTradingOption);
    }

    async navigateToSales() {
        await this.page.hover(this.salesMenu);
        await this.page.click(this.salesOptions);
    }

    async navigateToInventory() {
        await this.page.hover(this.inventoryMenu);
        await this.page.click(this.inventoryMenu);
    }
} 