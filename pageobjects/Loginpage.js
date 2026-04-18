class Loginpage{
  constructor(page){

this.page = page;

this.username = page.getByRole('textbox', { name: 'email@example.com' });
this.password = page.getByRole('textbox', { name: 'enter your passsword' });
this.signInbutton =  page.getByRole('button', { name: 'Login' });
}

async goUrl()
{
 await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');

}

async validLogin(username,password)
{

  await this.username.fill(username);
  await this.password.fill(password);
  await this.signInbutton.click();

}
}

module.exports = { Loginpage }; 