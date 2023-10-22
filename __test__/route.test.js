import "../dist/config.js";
import express from "express";
import request from "supertest";
import usersRouter from "../dist/src/routes/route_customer.js";
import dataSource from "../dist/src/db/dataSource.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use(express.urlencoded({ extended: false }));

console.log(process.env.DB_HOST);

beforeAll(async() => {
    await dataSource
        .initialize()
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.log("DB connection failed", err);
        });
}, 30000);

afterAll(async() => {
    await dataSource.destroy();
});

describe("Login process", () => {
    it("should login with valid credentials", async() => {
        const user = {
            email: "user2@email.com",
            password: "123456",
        };

        const response = await request(app).post("/users/login").send(user);

        expect(response.status).toBe(200);
    });
});