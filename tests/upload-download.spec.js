const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

// const workbook = new ExcelJs.Workbook();
// workbook.xlsx.readFile("D:/photos/Playwright/Excelfile.xlsx").then(function () {
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         })
//     }
//     )
// })


/*async function excelTest() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("D:/photos/Playwright/Excelfile.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
             if(cell.value==='Apple')
            {
                console.log(rowNumber);
                console.log(colNumber);
            }
        })
    }
    )

}
excelTest();
*/

async function writeExcel(searchText, replaceText, filePath, change) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);


}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;

}
//writeExcel("Mango",350, "D:/photos/Playwright/Excelfile.xlsx",{rowChange:0,colChange:2});

test("Upload download excel file", async ({ page }) => {
    const searchText = "Mango";
    const updatevalue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download'}).click();
    await downloadPromise;
    writeExcel("Mango", 350, "C:/Users/91821/Downloads/download.xlsx", { rowChange: 0, colChange: 2 });
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/91821/Downloads/download.xlsx");

    const textLocator = page.getByText(searchText);
    const desireRow = await page.getByRole('row').filter({has:textLocator});
    await expect(desireRow.locator("#cell-4-undefined")).toContainText(searchText);


})
