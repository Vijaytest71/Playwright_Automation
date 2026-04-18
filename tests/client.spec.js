const {test, expect} = require('@playwright/test');
const {Loginpage} = require('../pageobjects/Loginpage');


test('Browser', async ({ browser }) => 
{
const context =await browser.newContext({viewport:null});
const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

});


test.only('Add to cart', async ({ page }) => {

   const username = 'vijaytest71@gmail.com';
   const password = 'V!jay@123';
    
   const loginPage = new Loginpage(page);
   
   await loginPage.goUrl(); 
   await loginPage.validLogin(username,password);

  await page.getByRole('button', { name: 'View' }).nth(3).click();
  await page.getByRole('heading', { name: '$' }).click();
  await page.getByText('HOME ORDERS Cart Sign Out').click();
  await page.getByText('Automation Practice').click();
  await page.getByRole('img').nth(3).click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(3).click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button', { name: 'Checkout❯' }).click();
  await page.getByRole('textbox').first().click();

  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Vijay');
  await page.getByText('Place Order').click();
  await page.getByLabel('Please Enter Full Shipping').click();
  await page.getByText('Invoice').click();
  await page.getByText('Credit Card', { exact: true }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('321');

  await page.locator("[placeholder*='Country']").fill("ind", {delay:200});

  await page.getByText('Place Order').click();
  await page.pause();
  
});