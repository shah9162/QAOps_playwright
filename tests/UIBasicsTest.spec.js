const {test,expect}= require('@playwright/test');
const { promises } = require('dns');


test('Browser context playwright test', async ({browser})=>{
  const context=await browser.newContext();
  const page = await context.newPage();

  // block the request
//page.route('**/*.css',route=>route.abort());
//page.route('**/*.{jpg,png,jpeg}',route=>route.abort());

  const username= page.locator("#username");
  const password = page.locator("#password")
  const submit= page.locator("input[type='submit']");
  const productTitle = page.locator("div.card-body a");

  // page.on('request', request=>console.log(request.url()));
  // page.on('response', response=>console.log(response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title());

   // css and xpath
await username.fill("rahulshetty");
await page.locator("#password").fill("learning");
await submit.click();
console.log( await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect")

// clear
await username.fill("");
await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await submit.click();
 console.log( await productTitle.first().textContent());
// console.log( await productTitle.nth(1).textContent());
const alltitles =  await productTitle.allTextContents();
console.log(alltitles);



});

test('UI controls',async ({browser})=>{
const context = await browser.newContext();
const page =  await context.newPage();
const username= page.locator("#username");
const password = page.locator("#password")
const submit= page.locator("input[type='submit']");
const documentLink = page.locator("[href*='documents-request']");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await username.fill("rahulshettyacademy");
await password.fill("learning");
await page.locator("select.form-control").selectOption("consult");
await page.locator("span.checkmark").last().click();
await expect(page.locator("span.checkmark").last()).toBeChecked();
await page.locator("#okayBtn").click();
await page.locator("#terms").click();
await expect( page.locator("#terms")).toBeChecked();
await  page.locator("#terms").uncheck();
//expect(await page.locator("#terms").isChecked()).toBeTruthy();
await expect(documentLink).toHaveAttribute("class","blinkingText");
await page .locator('#signInBtn').click();

//await page.pause();
});

test('Child window Handling', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
const documentLink = page.locator("[href*='documents-request']");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")


const [newPage] =await Promise.all(
[
context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
documentLink.click()]); // new page is opened

 const text =await newPage.locator("p.red").textContent()
 const domain = text.split("@")[1].split(" ")[0];
 //console.log(domain);
 
 await page.locator("#username").fill(domain);
 //await page.pause();
 console.log(await page.locator("#username").inputValue());
 // textContent() works when the text is attached to the DOM however
 // if you want to inputed value in the form use inputValue()


})
