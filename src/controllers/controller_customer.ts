import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Profile } from '../db/entities/customers/Profile.js';



const insertUser = (payload: CustomerNS.Customer) => {
    // return dataSource.manager.transaction(async transaction => {
    //     const role = await Role.findOneBy({ name: payload.type });
    //     const newCustomer = Customer.create({
    //         ...payload,
    //         role: role as Role
    //     });

    //     await transaction.save(newCustomer);
    //     if (payload.type === 'customer') {
    //         const customer = Profile.create({
    //             phones: payload.profile || '',

    //         });
    //         employee.user = newUser;
    //         await transaction.save(employee);
    //     } else if (payload.type === 'employer') {
    //         const company = new CompanyProfile();
    //         company.user = newUser;
    //         company.description = payload.description || '';
    //         company.name = payload.fullName || '';
    //         await transaction.save(company);
    //     }
    // });
}

const insertCustomerController = async (payload: Customer) => {
    try {
        const newCustomer = Customer.create({ ...payload })
        await newCustomer.save()
        return newCustomer
    } catch (error) {
        throw new Error('there are something wrong')
    }
};
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
        const customer = await Customer.findOneBy({ email });
        if (!customer) { return undefined }
        const passwordMatching = await bcrypt.compare(password, customer?.password || '')
        if (customer && passwordMatching) {
            const token = jwt.sign({
                email: customer.email,
                userName: customer.userName,
                fName: customer.fName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "1d"
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

const profile = async (payload: CustomerNS.Customer) => {
    const relate = await dataSource.createQueryBuilder().relation(Customer, "profile").of(payload).loadOne()
    const profile = await Profile.findOneBy({ id: payload.id })
    if (relate) {
        const newProfile = Profile.create({
            ...payload.profile,
            customer: payload,
            profile: profile as Profile
        })
        await newProfile.save()
        return newProfile
    } else {
        throw new Error('there are something wrong')
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
    getPermission,
    profile
}