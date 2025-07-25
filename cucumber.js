module.exports = {
  default: {
    paths: ['features'],
    require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
        format: [
      'progress',
      'summary',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: {
      BASE_API_URL: 'https://devxyz-apicustody.sovera.io/api'
    },
    publishQuiet: true
  }
};
