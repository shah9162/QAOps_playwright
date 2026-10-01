const {expect} = require('@playwright/test');
const {custometest} = require('../utils/Fixtures.js');

custometest('Fuxture demo', async({autencicatedPage, createOrder, testDataForOrder})=>{

    await autencicatedPage.goto("https://rahulshettyacademy.com/client");
    await autencicatedPage.locator("button[routerlink*='myorders']").click();
    await autencicatedPage.locator("tbody").waitFor();
    await expect (autencicatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
    




});