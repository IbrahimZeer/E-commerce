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
    return newAdmin
}

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
                userName: user.userName,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const updateAdmin = async (email: string, payload: AdminNS.Admin) => {
    const admin = await Admin.findOne({ where: { email: payload.email } })
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

const deleteAdmin = async (email: string) => {
    const admin = await Admin.findOne({ where: { email: email } })
    await admin?.remove()
}

const getAdmins = () => {
    const admins = Admin.find()
    return admins
}

export {
    insertAdminController,
    updateAdmin,
    deleteAdmin,
    login,
    getAdmins
}