const { test, expect } = require('@playwright/test');
const {custometest} = require('../utils/test-base');
const {POmanager} = require('../pageObject/POmanager');
//json->string->object
const dataset =JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
// const { LoginPage } = require('../pageObject/LoginPage');
// const { DashboardPage } = require('../pageObject/DashboardPage');
const { CartPage } = require('../pageObject/CartPage');
const { CheckOutPage } = require('../pageObject/CheckOutPage');
const { ThankYouPage } = require('../pageObject/ThankYouPage');
const { Orders } = require('../pageObject/Orders');
const { OrderSummery } = require('../pageObject/OrderSummery');

for(const data of dataset){
test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POmanager(page);
    const products = page.locator("div.card-body");

    const loginPage = await poManager.getLoginpage();
    await loginPage.goTo();
    await loginPage.signIn(data.email, data.password);

    console.log(await page.title());

    //await page.locator("div.card-body b").first().waitFor();
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.gotoCart();

    const cartpage = new CartPage(page, data.productName);
    const bool = await cartpage.verifyProduct();
    expect(bool).toBeTruthy();
    await cartpage.checkOut();

    const checkOut = new CheckOutPage(page);
    await checkOut.fillAddress(dataset.email);
    const emailverify = await checkOut.verifyEmail();
    await expect(emailverify.first()).toHaveText(data.email);
    await checkOut.placeOrder();

    const thankYouPage = new ThankYouPage(page);
    const thankyou = await thankYouPage.verifyThankYouMessageText();

    await expect(thankyou).toHaveText(" Thankyou for the order. ");
    const orderId = await thankYouPage.getOrderId();
    console.log(orderId);
    await thankYouPage.myOrders();

    const orders = new Orders(page);
    await orders.clickOnViewButton(orderId);

    const orderSummery = new OrderSummery(page)
    const orderIdDetails = await orderSummery.verifyOrder_OrderSummery();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();





})
};

custometest(`@Web Client App login`, async ({ page, testDataForOrder }) => {
    const poManager = new POmanager(page);
    const products = page.locator("div.card-body");

    const loginPage = await poManager.getLoginpage();
    await loginPage.goTo();
    await loginPage.signIn(testDataForOrder.email, testDataForOrder.password);

    console.log(await page.title());

    //await page.locator("div.card-body b").first().waitFor();
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.gotoCart();

    const cartpage = new CartPage(page, testDataForOrder.productName);
    const bool = await cartpage.verifyProduct();
    expect(bool).toBeTruthy();
    await cartpage.checkOut();

    // test files will trigger paraller
    // individual test in the file will run in sequence


})

