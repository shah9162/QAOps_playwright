const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');

class POmanager {

    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
       this.dashboardPage= new DashboardPage(this.page);

    }

    getLoginpage()
    {
       return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
}

module.exports = {POmanager};