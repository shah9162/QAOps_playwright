const { test } = require('@playwright/test');

test("demo test", async ({ page }) => {

    await page.goto(
        "https://www.wthubspot.com/agent-hub-roi-calculator/total-roi"
    );

    const loc = page.locator("div[data-cy='total-investment']");

    const rows = await loc
        .locator("div.cl-card")
        .filter({ hasText: 'Hub' })
        .all();

    const items = [];

    for (const row of rows) {

        const text = await row.textContent() ?? '';

        items.push({
            label: text.split('$')[0].trim(),
            amount: Number(
                text.split('$')[1].replace(/,/g, '').trim()
            ),
        });
    }

    console.log(items);
});