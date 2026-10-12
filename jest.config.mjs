const config = {
      testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "\\.css$": "identity-obj-proxy" },
  }

export default config