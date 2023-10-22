import Express from "express"
import jwt from "jsonwebtoken"
import { Customer } from "../db/entities/customers/Customer.js";
import dotenv from "dotenv"
import { ExpressNS } from "../../@types/index.js";
import { RequestHandler } from "express";

dotenv.config()
const authenticate: RequestHandler<any, any, Record<string, any>, any, Record<string, any>> = async (req, res, next) => {
    const token = req.headers["authorization"] || ""
    let validToken;
    try {
        validToken = jwt.verify(token, process.env.SECRET_KEY || "")
    } catch (error) {

    }

    if (validToken) {
        const decoded = jwt.decode(token, { json: true });
        if (decoded?.email) {
            const user = await Customer.findOneBy({ email: decoded.email });
            (req as ExpressNS.RequestWithUser).user = user || undefined;
        } else {
            (req as ExpressNS.RequestWithUser).user = undefined;
        }
        next();
    } else {
        res.status(401).send("you are unauthorized")
    }

}

export { authenticate }

// import Express from "express"
// import jwt from "jsonwebtoken"
// import { Customer } from "../db/entities/customers/Customer.js";
// import dotenv from "dotenv"
// import { ExpressNS } from "../../@types/index.js";
// import { RequestHandler } from "express";

// dotenv.config()
// const authenticate: RequestHandler<any, any, Record<string, any>, any, Record<string, any>> = async (req, res, next) => {
//     const token = req.headers["authorization"] || ""
//     let validToken;
//     try {
//         validToken = jwt.verify(token, process.env.SECRET_KEY || "")
//     } catch (error) {

//     }

//     if (validToken) {
//         const decoded = jwt.decode(token, { json: true });
//         if (decoded?.email) {
//             const user = await Customer.findOneBy({ email: decoded.email });
//             (req as ExpressNS.RequestWithUser).user = user || undefined;
//         } else {
//             (req as ExpressNS.RequestWithUser).user = undefined;
//         }
//         next();
//     } else {
//         res.status(401).send("you are unauthorized")
//     }

// }

// export { authenticate }