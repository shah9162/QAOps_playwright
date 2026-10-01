class OrderSummery{


    constructor(page)
    {
        this.page = page;
        this.orderIdDetails = page.locator(".col-text")
    }

  async verifyOrder_OrderSummery()
    {
        const orderIdDetails = await this.orderIdDetails.textContent();
        return orderIdDetails;

    }
}
module.exports ={OrderSummery};