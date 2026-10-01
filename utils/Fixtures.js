const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APiUtils } = require('./APiUtils.js')
const loginPayload = { userEmail: "msd916288@gmail.com", userPassword: "Boss@1234" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };


exports.custometest = base.test.extend(

    {
        autencicatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const email = "msd916288@gmail.com";
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await page.locator("#userEmail").fill(email);
            await page.locator("#userPassword").fill("Boss@1234");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');

            await use(page);
        },

          createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);

        },
        testDataForOrder:{
             productName : "Adidas Oroginal"
        }
    },
  );