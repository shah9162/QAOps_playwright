const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');

const loginPayload = { userEmail: "msd916288@gmail.com", userPassword: "Boss@1234" }
const orderPayload = {orders:[{"country":"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoad = { message: "No Product in Cart" };
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Place the order', async ({ page }) => {


    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // intercepting response -API response ->|||{playwright fake response} browser->render data on frontend
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoad);
            route.fulfill({
                response,
                body

            })


        }
    )

    await page.locator("button[routerlink*='myorders']").click();
    //  await page.pause();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());



})