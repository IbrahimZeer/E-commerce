import dotenv from "dotenv"
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { DataSource } from "typeorm";
import { Review } from "./entities/Review.js";
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
import { OrderDetails } from "./entities/orders/OrderDetails.js";
import { OrderStatus } from "./entities/orders/OrderStatus.js";
import { Status } from "./entities/orders/Status.js";
import { PaymentData } from "./entities/payments/PaymentData.js";
import { PaymentMethod } from "./entities/payments/PaymentMethod.js";
import { Transaction } from "./entities/payments/Transaction.js";
import { TransactionStatus } from "./entities/payments/TransactionStatus.js";
import { Cart } from "./entities/Cart.js";
import { Payment } from "./entities/payments/Payment.js";
import { Address } from "./entities/customers/Address.js";

dotenv.config()

console.log(process.env.DB_NAME)
const dataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
                Cart,
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
                Cart,
                Payment,
                Role,
                Address,
                Permission
        ],
        migrations: ['./**/migration/*.ts'],
        synchronize: true,
        logging: false
});

export default dataSource;