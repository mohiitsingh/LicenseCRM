const {request} = require("../setup/test-server");
const {buildUser} = require("../factories/user.factory");

const registerUser = async(overrides = {}) => {
    const user = buildUser(overrides);
    await request
        .post("/api/v1/auth/register")
        .send(user);
    return user;
}

const loginUser = async(overides = {}) => {
    const response = await request
        .post("/api/v1/auth/login")
        .send({
            email: user.email,
            password: user.password
        });
}

const user = await registerUser();
const token =  await loginUser();

await 

module.exports = {registerUser, loginUser};