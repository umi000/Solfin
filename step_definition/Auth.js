const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BASE_API_URL = 'https://staging-api.sovera.io/api'
var token = "";
Given('I have an active API connection to the Custody service', function () {
  // This step is mainly for readability and can be used to set up request-specific data
  this.request = {};
});

When('I send a {string} request to {string}', async function (method, endpoint) {
  this.response = await this.apiRequestContext[method.toLowerCase()](BASE_API_URL+endpoint);
});

Then('the response status code should be {int}', async function (statusCode) {
    // console.log(this.response);
  expect(this.response.status()).toBe(statusCode);

});

Then('the response body should contain the message {string}', async function (expectedMessage) {
    const responseBody = await this.response.json();
    const message = Array.isArray(responseBody.message) ? responseBody.message[0] : responseBody.message;
    expect(message).toBe(expectedMessage);
});

Then('the response body dcshould contain the message {string}', async function (expectedMessage) {
    const responseBody = await this.response.json();
    const message = Array.isArray(responseBody.message) ? responseBody.message[0] : responseBody.message;
    expect(message).toBe(expectedMessage);
});

When('I send a {string} request to {string} with the payload:', async function (method, endpoint, payload) {
  const requestBody = JSON.parse(payload);
  this.response = await this.apiRequestContext[method.toLowerCase()](BASE_API_URL+endpoint, {
    data: requestBody
  });
});

Then('the response body should contain an authentication token', async function () {
  const responseBody = await this.response.json();
  token = responseBody.data.session_token;
  expect(responseBody.data.session_token).toBeDefined();
  expect(responseBody.data.session_token).not.toBeNull();
});
