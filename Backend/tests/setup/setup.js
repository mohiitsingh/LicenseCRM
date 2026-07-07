const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

let mongoServer;

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    const uri = mongoServer.getUri();
    console.log("Mongo uri", uri);
});

afterEach(async() => {
    const collections = mongoose.connection.collections;
    for(const key in collections){
        await collections[key].deleteMany({});
    }
})

afterAll(async() => {
    await mongoose.connection.close();
    await mongoServer.stop();
})