const {request} = require("../../setup/test-server");
const {builderUser} = require("../../factories/user.factory");

describe("POST /auth/register", () => {
    it("should register a new user", async() => {
        const response = await request
            .post("/api/v1/auth/register")
            .send(builderUser());
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.role).toBe("USER");
    })
})

// {
            //     name: "Mohit",
            //     email: "mohit@test.com",
            //     password: "Test@123"
            // }