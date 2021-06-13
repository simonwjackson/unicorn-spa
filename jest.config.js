module.exports = {
   preset: 'ts-jest',
   testPathIgnorePatterns: ['/node_modules/', 'cypress'],
   testRegex: '((\\.|/)(test))\\.[jt]sx?$',
   // Indicates whether the coverage information should be collected while executing the test
   collectCoverage: true,
   coverageReporters: ['json'],
   // The directory where Jest should output its coverage files
   coverageDirectory: 'jest-coverage',
   // The test environment that will be used for testing
   testEnvironment: 'node',
   globals: {
      'ts-jest': {
         tsConfig: {
            importHelpers: true,
         },
      },
   },
}
