class LoginPage {

    constructor(page) {
         this.page= page;
         this.userName = page.locator("#userEmail");
         this.password = page.locator("#userPassword");
         this.signInButton = page.locator("#login");
    }

async signIn(email, password)
{
 await  this.userName.fill(email);
 await this.password.fill(password);
 await this.signInButton.click();
 await this.page.waitForLoadState('networkidle');
}

async goTo(){
     await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

}

module.exports = {LoginPage};