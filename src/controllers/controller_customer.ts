import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"





const insertCustomerController = async (payload: Customer) => {

    return dataSource.manager.transaction(async transaction => {
        // const role = await Role.findOneBy({ name: payload.type });
        const newUser = Customer.create({
            ...payload
            // role: role as Role
        });

        await transaction.save(newUser);
        // if (payload.type === 'employee') {
        //     const employee = EmployeeProfile.create({
        //         applications: [],
        //         cvUrl: payload.cvUrl || ''
        //     });
        //     employee.user = newUser;
        //     await transaction.save(employee);
        // } else if (payload.type === 'employer') {
        //     const company = new CompanyProfile();
        //     company.user = newUser;
        //     await transaction.save(company);
        // }
    });
    // // const user = await Customer.findOneBy({ id: payload.id })
    // const newCustomer = Customer.create({
    //     fName: payload.fName,
    //     lName: payload.lName,
    //     email: payload.email,
    //     password: payload.password
    // })
    // newCustomer.save()
    // return {
    //     newCustomer
    //     // token
    // }
    // if (!user) {
    // } else {
    //     // throw new Error(`already have customer`)
    // }
    // const token = jwt.sign({
    //     id: payload.id,
    //     email: payload.email
    //     // isAdmin: payload.isAdmin
    // }, process.env.SECRET_KEY || "", {
    //     expiresIn: "14d"
    // })
}


const updateCustomer = async (payload: CustomerNS.Customer) => {

}

const deleteCustomer = async (payload: CustomerNS.Customer) => {

}

const insertProduct = async (payload: CustomerNS.Customer) => {

}

const updateProduct = async (payload: CustomerNS.Customer) => {

}

const deleteProduct = async (payload: CustomerNS.Customer) => {

}

//------->LOGIN-------------->

const login = async (email: string, password: string) => {
    try {
        const customer = await Customer.findOneBy({
            email
        });

        if (!customer) {
            return undefined
        }

        const passwordMatching = await bcrypt.compare(password, customer?.password || '')

        if (customer && passwordMatching) {
            const token = jwt.sign({
                email: customer.email,
                userName: customer.fName,
                password: customer.password
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            })

            return {
                userName: customer.userName,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}


const inssertRole = async (payload: CustomerNS.Customer) => {

}


const insertPermission = async (payload: CustomerNS.Customer) => {

}

const getCustomers = () => {
    const Customers = Customer.find()
    return Customers
}

const getProducts = () => {

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
    insertCustomerController,
    updateCustomer,
    deleteCustomer,
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    inssertRole,
    insertPermission,
    getCustomers,
    getProducts,
    getRoles,
    getPermission
}