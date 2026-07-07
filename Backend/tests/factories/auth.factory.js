const buildLoginRequest = (overrides = {}) => ({
    email: "user@test.com",
    password: "Test@123",
    ...overrides
});

module.exports = {buildLoginRequest};