const { setWorldConstructor, Before, After, World } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');

class ApiWorld extends World {
  constructor(options) {
    super(options);
    this.apiRequestContext = null;
  }

  async init(baseUrl) {
    this.apiRequestContext = await request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        // 'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });
  }
}

setWorldConstructor(ApiWorld);

Before(async function () {
  const { BASE_API_URL } = this.parameters;
  await this.init(BASE_API_URL);
});

After(async function () {
  if (this.apiRequestContext) {
    await this.apiRequestContext.dispose();
  }
});

