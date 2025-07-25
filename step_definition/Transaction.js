const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am logged in as {string} with password {string}', async function (email, password) {
  const loginResponse = await this.apiRequestContext.post('/auth/login', {
    data: {
      email: email,
      password: password
    }
  });

  const responseBody = await loginResponse.json();
  this.attach(`Login Response: ${JSON.stringify(responseBody, null, 2)}`);

  expect(loginResponse.ok()).toBeTruthy();

  this.token = responseBody.data.session_token;
  expect(this.token).toBeDefined();
});

When('I place a {string} order for {string} with amount {string}', async function (orderType, asset, amount) {
  const transactionResponse = await this.apiRequestContext.post('/transactions', {
    headers: {
      'Authorization': `Bearer ${this.token}`
    },
    data: {
      type: orderType,
      asset: asset,
      amount: parseFloat(amount)
    }
  });
  this.response = transactionResponse;
});

Then('the response should contain a transaction confirmation', async function () {
  const responseBody = await this.response.json();
  expect(responseBody.data.transactionId).toBeDefined();
  expect(responseBody.data.status).toBe('completed');
});
