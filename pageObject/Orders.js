class Orders {

    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");

    }

    async clickOnViewButton(orderId) {


        for (let i = 0; i < await this.rows.count(); i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            console.log(rowOrderId);
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}
module.exports = {Orders};