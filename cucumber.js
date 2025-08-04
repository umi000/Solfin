module.exports = {
  default: {
    paths: ['features'],
    require: ['step_definition/**/*.js', 'helper/**/*.js'],
        format: [
      'progress',
      'summary',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: { 
      BASE_API_URL: 'https://staging-api.sovera.io/api'
    },
    publishQuiet: true
  }
};
