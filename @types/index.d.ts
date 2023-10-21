import { Customer } from "../src/db/entities/customers/Customer.ts";
import express from 'express';

namespace ExpressNS {
    export interface RequestWithUser extends express.Request {
        user?: Customer;
    }
}