import { DataSource } from "typeorm";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import dotenv from "dotenv"
dotenv.config()

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});

export default dataSource;