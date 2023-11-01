import "../dist/config.js";
import express from "express";
import request from "supertest";
import usersRouter from "../dist/src/routes/route_customer.js";
import dataSource from "../dist/src/db/dataSource.js";
import routeProduct from "../dist/src/routes/route_product.js";
import { insertProduct } from "../dist/src/controllers/controller_product.js";
import { Product } from "../dist/src/db/entities/Products/Product";
import { deleteOrder } from "../dist/src/controllers/controller_order.js";
import { order } from "../dist/src/db/entities/orders/Order.js";
import routeOrder from "../dist/src/routes/route_order.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/Products", routeProduct);
app.use("/orders", routeOrder);
app.use(express.urlencoded({ extended: false }));

console.log(process.env.DB_HOST);

beforeAll(async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
}, 30000);

afterAll(async () => {
  await dataSource.destroy();
});

describe("Login process", () => {
  it("should login with valid credentials", async () => {
    const user = {
      email: "user2@email.com",
      password: "123456",
    };

    const response = await request(app).post("/users/login").send(user);

    expect(response.status).toBe(200);
  });
});

describe("signup process", () => {
  it("should register with valid credentials", async () => {
    const user = {
      fName: "mohammad",
      lName: "ss",
      userName: "sdWQEa",
      email: "WER@example.com",
      password: "1234efg56",
    };

    const response = await request(app).post("/users/").send(user);
    //.status should be 201
    expect(response.status).toBe(400);
  });
});
describe("add product process", () => {
  it("should add products  with valid credentials", async () => {
    const user = {
      productName: "CPU",
      description: "CoreI7",
      quantity: "2",
      price: "1000$",
      isSold_Active: true,
    };

    const response = await request(app)
      .post("/Products/add_product")
      .send(user);
    expect(response.status).toBe(401);
    //AUTH
  });
});
describe("get all product process", () => {
  it("should list all products with valid credentials", async () => {
    const user = {};
    const response = await request(app)
      .post("/Products/add_product")
      .send(user);
    expect(response.status).toBe(401);
    //auth 
  });
});
//--------------------------------------

describe("insertProduct", () => {
  it("should insert a new product", async () => {
    const payload = {
      productNo: 123,
      productName: "Sample Product",
      description: "A test product description",
      quantity: 10,
      price: 100,
      isSold_Active: true,
    };
    const newProduct = await insertProduct(payload);
    expect(newProduct).toBeDefined();
    expect(newProduct.productNo).toEqual(payload.productNo);
    expect(newProduct.productName).toEqual(payload.productName);
  });
});

it("should throw an error when insertion fails", async () => {
  const payload = {
    productNoo: 123,
    productNaame: "Sample Product",
    descriptsion: "A test product description",
    quantitdy: 10,
    price: 100,
    isSold_Active: true,
  };


});
describe("add Order process", () => {
  it("should add Orders  with valid credentials", async () => {
    const order = {
      orderAddress: "dfgfds",
      productPrice: 1234,
      deliveryCost: 5432,
      discount: 20,
    };

    const response = await request(app)
      .post("/orders/checkout")
      .send(order);
    expect(response.status).toBe(401);
  });
});