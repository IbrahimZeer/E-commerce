import dotenv from "dotenv"
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { DataSource } from "typeorm";
import { Review } from "./entities/review.js";
import { Admin } from "./entities/Admin.js";
import { Attachment } from "./entities/Products/Attachment.js";
import { Brand } from "./entities/Products/Brand.js";
import { Category } from "./entities/Products/Category.js";
import { Color } from "./entities/Products/Color.js";
import { Product } from "./entities/Products/Product.js";
import { Size } from "./entities/Products/Size.js";
import { City } from "./entities/customers/City.js";
import { Country } from "./entities/customers/Country.js";
import { Customer } from "./entities/customers/Customer.js";
import { Phone } from "./entities/customers/Phone.js";
import { Profile } from "./entities/customers/Profile.js";
import { Order } from "./entities/orders/Order.js";
import { OrderDetails } from "./entities/orders/orderDetails.js";
import { OrderStatus } from "./entities/orders/orderStatus.js";
import { Status } from "./entities/orders/status.js";
import { PaymentData } from "./entities/payments/PaymentData.js";
import { PaymentMethod } from "./entities/payments/paymentMethod.js";
import { Transaction } from "./entities/payments/transaction.js";
import { TransactionStatus } from "./entities/payments/transactionStatus.js";

dotenv.config()

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Review,
        Admin,
        Attachment,
        Brand,
        Category,
        Color,
        Product,
        Size,
        City,
        Country,
        Customer,
        Phone,
        Profile,
        Order,
        OrderDetails,
        OrderStatus,
        Status,
        PaymentData,
        PaymentMethod,
        Transaction,
        TransactionStatus,
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});

export default dataSource;