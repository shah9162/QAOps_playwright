class CartPage {


    constructor(page, productName) 
    {
        this.productlist =page.locator('h3', { hasText: productName });
        this.checkout =  page.locator("text=Checkout");
    }

    async verifyProduct() 
    {
        const bool = await this.productlist.isVisible();
        return bool;
    }

    async checkOut()
    {
        await this.checkout.click();
    }
}
module.exports = {CartPage};