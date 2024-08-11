/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};