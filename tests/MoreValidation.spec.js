const {test,expect}= require('@playwright/test');


// test.describe.configure({mode:'parallel'})  test will run in parallel
//test.describe.configure({mode:"serial"})  if one test fail then next will be skip

test('More validation test', async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
//await page.pause();
page.on('dialog',dialog=>dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#alertbtn").click();
await page.locator("#mousehover").hover();

//iframe or frameset

const pageFrame = page.frameLocator("courses-iframe");
//pageFrame.locator("[hhhhh]:visible"); only visible elememnt will be select
})