class ThankYouPage{

constructor(page)
{
this.page = page;
this.heroPrimary = page.locator(".hero-primary")
this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
this. myorder = page.locator("button[routerlink*='myorders']")

}

async verifyThankYouMessageText()
{
   return await this.heroPrimary;
}

async getOrderId()
{
const orderId = await this.orderId.textContent();
return orderId;
}

async myOrders()
{
    await this.myorder.click();
    await this.page.locator("tbody").waitFor();
}

}

module.exports = {ThankYouPage};