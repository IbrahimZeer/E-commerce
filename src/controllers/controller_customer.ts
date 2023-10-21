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
    return dataSource.manager.transaction(async transaction => {
        const profile = await Profile.findOneBy({ id: payload.profile });
        const newCustomer = Customer.create({
            ...payload,
            profile: profile as Profile
        });
        const { email, password } = payload;
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
            await transaction.save(newCustomer);
            return {
                newCustomer,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    });
}

const insertCustomerController = async (payload: Customer) => {
    console.log(payload + 'from controller')
    try {
        const newCustomer = Customer.create({ ...payload })
        await newCustomer.save()
        console.log(payload)
        return newCustomer
    } catch (error) {
        console.log(payload + 'from controller catch')
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



const updateCustomer = async (payload: CustomerNS.Customer, customerIn: Customer) => {
    const customer = await Customer.findOneBy({ id: customerIn.id })
    if (!customer) {
        throw new Error('user not found')
    }
    if (payload.fName) { customer.fName = payload.fName }
    if (payload.lName) { customer.lName = payload.lName }
    if (payload.email) { customer.email = payload.email }
    const profile = await Profile.findOneBy({ id: customer.profile?.id })

    customer.save()


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
                customer,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const profile = async (payload: CustomerNS.Profile) => {
    // const relate = await dataSource.createQueryBuilder().relation(Customer, "profile").of(payload).loadOne()
    // const profile = await Profile.findOneBy({ id: payload.id })
    // if (!profile) {
    //     if (relate) {
    //         const newProfile = Profile.create({
    //             ...payload.profile,
    //             customer: payload,
    //         })
    //         await newProfile.save()
    //         return newProfile
    //     } else {
    //         throw new Error('there are something wrong')
    //     }
    // } else {
    //     if (relate) {
    //         const newProfile = Profile.create({
    //             ...payload.profile,
    //             customer: payload,
    //             profile: profile as Profile
    //         })
    //         await newProfile.save()
    //         return newProfile
    //     } else {
    //         throw new Error('there are something wrong')
    //     }
    // }
    const relate = await dataSource.createQueryBuilder().relation(Customer, "profile").of(payload).loadOne()
    try {
        const profile = Profile.create({
            ...payload
        });
        relate.profile = profile;
        await relate.save();
        await profile.save();
        return profile;
    } catch (error) {
        console.log(error);
        throw ("Something went wrong");
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
    profile,
    insertUser
}