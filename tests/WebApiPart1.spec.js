const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');

const loginPayload = { userEmail: "msd916288@gmail.com", userPassword: "Boss@1234" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('@Api Place the order', async ({ page }) => {


    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");


    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log(rowOrderId);
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
  //  await page.pause();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();





})