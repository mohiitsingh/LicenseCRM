const app = require("./src/app");
const connectDB = require("./src/config/db");
const env = require("./src/config/env");

const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try {
        await connectDB();
        app.listen(env.port, () => {
            console.log("server is running", PORT);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
