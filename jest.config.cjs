module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!axios)",
    //  'node_modules',
  ],

  moduleFileExtensions: ["ts", "tsx", "js"],
};
