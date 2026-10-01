const base = require('@playwright/test');

exports.custometest = base.test.extend(
{
  testDataForOrder : {
     productName :"ZARA COAT 3",
     email : "msd916288@gmail.com",
     password : "Boss@1234"
}
  }

)