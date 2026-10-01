class DashboardPage {


    constructor(page) {
        this.page = page;
        this.productTitle = page.locator("div.card-body b")
        this.products = page.locator("div.card-body");
        this.card= page.locator("[routerlink*='cart']");

    }

    async searchProduct(productName) {
        const titles = await this.productTitle.allTextContents();
        console.log(titles);

        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

    async gotoCart()
    {
      await this.card.click();
      await this.page.locator("div.cart  li").first().waitFor();

    }
}
module.exports= {DashboardPage};