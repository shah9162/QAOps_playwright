class CheckOutPage {


    constructor(page) {
        this.page = page;
        this.country = page.getByPlaceholder('Select Country');
        this.dropdown = page.locator("section.ta-results");
        this.placeorder = page.locator(".action__submit");
        this.emailVerify=page.locator(".user__name [type='text']");
    }

    async fillAddress() {
        await this.country.pressSequentially("ind", { delay: 150 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            if (await this.dropdown.locator("button").nth(i).textContent() === " India") {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }



    }

    async verifyEmail()
    {
        return await this.emailVerify;
    }

    async placeOrder() {
        await this.placeorder.click();
    }
}
module.exports = {CheckOutPage};