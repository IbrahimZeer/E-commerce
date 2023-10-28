import express from 'express';
import dataSource from '../db/dataSource.js';
import { AdminNS } from '../../@types/type_admin.js';
import { Admin } from '../db/entities/Admin.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


const insertAdminController = async (payload: Admin) => {
    const newAdmin = Admin.create({
        userName: payload.userName,
        email: payload.email,
        password: payload.password
    }).save()
    return {
        newAdmin
    }
}

// const login = async (email: string, password: string) => {
//     try {
//         const customer = await Admin.findOneBy({ email });
//         if (!customer) { return undefined }
//         const passwordMatching = await bcrypt.compare(password, customer?.password || '')
//         if (customer && passwordMatching) {
//             const token = jwt.sign({
//                 email: customer.email,
//                 userName: customer.userName,
//             }, process.env.SECRET_KEY || "", {
//                 expiresIn: "1d"
//             })
//             return {
//                 userName: customer.userName,
//                 token
//             }
//         } else {
//             throw ("invalid email or password")
//         }
//     } catch (error) {
//         throw ("invalid email or password")
//     }
// }
const login = async (email: string, password: string) => {
    try {
        const user = await Admin.findOneBy({
            email
        });

        if (!user) {
            return undefined
        }

        const passwordMatching = await bcrypt.compare(password, user?.password || '')

        if (user && passwordMatching) {
            const token = jwt.sign({
                email: user.email,
                userName: user.userName,
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            })

            return {
                userName:user.userName,
                token 
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const updateAdmin = async (id: number, payload: AdminNS.Admin) => {
    const admin = await Admin.findOne({ where: { id: payload.id } })
    if (admin) {
        admin.userName = payload.userName
        admin.email = payload.email
        admin.password = payload.password
        await admin.save()
        return admin
    }
    else {
        return null
    }
}

const deleteAdmin = async (payload: AdminNS.Admin) => {
    const admin = await Admin.findOne({ where: { id: payload.id } })
    if (admin) {
        admin.remove()
    }
    else {
        throw ("Adminid not found")
    }
}

const getAdmins = () => {
    const admins = Admin.find()
    return admins
}

const getProducts = () => {
    const products = Product.find()
    return products
}

const getRoles = () => {
    const roles = Role.find()
    return roles
}

const getPermission = () => {
    const permissions = Permission.find()
    return permissions
}

export {
    insertAdminController,
    updateAdmin,
    deleteAdmin,
    login,
    getAdmins,
    getProducts,
    getRoles,
    getPermission
}