const {request} = require("../../setup/test-server");
const {registerUser} = require("../../helpers/auth.helper");

describe("POST /auth/login", () => {
    it("should login successfully", async() => {
        const user = await registerUser();
        const response = await request
            .post("/api/v1/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.user.email).toBe(user.email);
    })

    it("should reject invalid password", async() => {
        const user = registerUser();
        const response = await request
            .post("/api/v1/auth/login")
            .send({
                email: user.email,
                password: "Wrong password"
            });
        expect(response.status).toBe(400);
    })

    it("should reject unknown email", async() => {
        const response = await request
            .post("/api/v1/auth/login")
            .send({
                email: "unknown@test.com",
                password: "Test@123"
            });
        expect(response.status).toBe(401)
    })

    it("should not allow disabled user to login", async() => {
        const user = await register();
        const response = await request
            .post("/api/v1/auth/login")
            .send({
                email: "test@test.com",
                password: "password"
            });
        expect(response.status).toBe(403);
    })

})
