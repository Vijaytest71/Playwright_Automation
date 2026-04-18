const {test, expect} = require('@playwright/test');

test('Broswer COnfiguration', async ({browser})=> 
{

const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log("Browser");
});


test('Login Page Configuration', async ({page})=> 
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await page.locator("#username").fill("rahulshettyacademy");
await page.locator("#password").fill("learning");
await page.locator(".radiotextsty").nth(1).click(); 
await page.locator("button#okayBtn").click();

const dropdown =  page.locator("select.form-control");
dropdown.selectOption("Student");

await page.locator("#terms").click();
await page.locator("input#signInBtn").click();
console.log("Login Sucess");
await expect(page).toHaveTitle("ProtoCommerce");

await page.getByRole('link', { name: 'iphone X' }).click();

  await page.locator('form input[name="name"]').fill('Vijay');
  await page.locator('input[name="email"]').fill('vijaytest@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('V!jay@123');

  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByRole('radio', { name: 'Student' }).check();
  await page.locator('input[name="bday"]').fill('2026-01-01');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('× Success! The Form has been').click();
  await expect(page.getByText('× Success! The Form has been')).toBeVisible();
  console.log("Product Iphone ");

  await page.getByText('Shop').click();

  await page.getByRole('link', { name: 'Samsung Note' }).click(); 
  await page.locator('form input[name="name"]').fill('Vinay');
  await page.locator('input[name="email"]').fill('testt@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('134566');

  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByRole('radio', { name: 'Student' }).check();
  await page.locator('input[name="bday"]').fill('2026-01-01');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('× Success! The Form has been').click();
  console.log("Product Samsng Note");

  await page.getByText('Shop').click();
  await page.pause();
});

//https://rahulshettyacademy.com/client/#/auth/login
//vijaytest71@gmail.com
//V!jay@123