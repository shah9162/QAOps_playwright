const {test, expect}=require('@playwright/test');

test('Calendar validations', async ({ browser }) => {

    const context = await browser.newContext();
   const page=  await context.newPage();
  
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator("div.react-date-picker__inputGroup").click();
    await page.locator("[class*='navigation__label__labelText']").click();
    await page.locator("[class*='navigation__label__labelText']").click();
    await page.locator("[class*='decade-view__years__year']").filter({hasText:year}).click();
    await page.locator("[class*='year-view__months__month']").nth(Number(monthNumber)-1).click();
    await page.locator("[class*='month-view__days__day']").getByText(date).click();

    const input =  page.locator(".react-date-picker__inputGroup__input");
    for(let i=0; i<expectedList.length;i++){
     const value =  await input.nth(i).getAttribute("value");
     expect(value).toEqual(expectedList[i]);
    }


 
});