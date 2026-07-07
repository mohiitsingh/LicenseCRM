const builderUser = (overrides = {}) => ({
    name: "Test user",
    email: `user${Date.now()}@test.com`,
    password: "Test@123",
    ...overides
})

module.exports = {builderUser}