module.exports = {
    testEnvironment: 'node',
    testMatch: [
        "**/tests/**/*.test.js"
    ],
    setupFileAfterEnv: [
        "./tests/setup/setup.js"
    ]
}