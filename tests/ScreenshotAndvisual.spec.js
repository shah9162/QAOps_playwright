const {test,expect}= require('@playwright/test');

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});
test('Screenshot $ visual comparisation', async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
await expect(page.locator("#displayed-text")).toBeVisible();
// screenshot 
//await page.locator('#displayed-text').screenshot({path:'Screenshot/partialScreenshot.png'});
await page.locator("#hide-textbox").click();
//await page.screenshot({path:'screenshot.png'});
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

// Screenshot - store -> screenshot ->
test('visual', async({page})=>{
    await page.goto('https://www.wthubspot.com/tco-calculator')
   // await page.pause();
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})