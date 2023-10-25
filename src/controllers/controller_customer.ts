import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Profile } from '../db/entities/customers/Profile.js';
import { Like } from 'typeorm';
import { Cart } from '../db/entities/Cart.js';
import { Phone } from '../db/entities/customers/Phone.js';
import { Country } from '../db/entities/customers/Country.js';
import { Payment } from '../db/entities/payments/Payment.js';



const insertUser = async (payload: Customer) => {
    const customer = await Customer.find({ where: { email: payload.email } })
    if (!customer) {
        throw "customer already exists"
    }
    const token = jwt.sign({
        email: payload.email,
        id: payload.id
    }, process.env.SECRET_KEY || "", {
        expiresIn: "1d"
    })
    const cart = await Cart.create({}).save()
    const phone = await Phone.create({}).save()
    const country = await Country.create({}).save()
    const payment = await Payment.create({}).save()
    const profile = await Profile.create({
        country: country,
        phones: [phone],
        payments: [payment]
    }).save()

    profile.country = country as Country
    profile.phones = [phone] as Phone[]
    profile.payments = [payment] as Payment[]

    const newCustomer = await Customer.create({
        ...payload,
        cart: cart,
        profile: profile
    }).save()

    newCustomer.profile = profile as Profile
    newCustomer.cart = cart as Cart
    return {
        newCustomer,
        token
    };
}


const updateCustomer = async (payload: Customer, customerIn: Customer) => {
    const customer = await Customer.findOneBy({ id: customerIn.id })
    if (!customer) {
        throw new Error('user not found')
    }
    if (payload.fName) { customer.fName = payload.fName }
    if (payload.lName) { customer.lName = payload.lName }
    const findEmail = await Customer.findOneBy({ email: payload.email })
    if (findEmail) {
        return new Error('email already exists')
    } else {
        if (payload.email) { customer.email = payload.email }
    }
    if (payload.password) { customer.password = payload.password }
    const findUserName = await Customer.findOneBy({ userName: payload.userName })
    if (findUserName) {
        return new Error('username already exists')
    } else {
        if (payload.userName) { customer.userName = payload.userName }
    }
    if (payload.country) { customer.country = payload.country }
    if (payload.profile) { customer.profile = payload.profile }
    customer.save()


}

const deleteCustomer = async (customer: Customer) => {
    const customerToDelete = await Customer.findOneBy({ id: customer.id })
    if (customerToDelete) {
        await customerToDelete.remove()
        return customerToDelete
    }
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
                id: customer.id
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            })

            const cart = await Cart.findOneBy({ id: customer.cart?.id })
            const profile = await Profile.findOneBy({ id: customer.profile?.id })
            customer.cart = cart as Cart
            customer.profile = profile as Profile


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

const search_customers = async (userName: string) => {
    try {
        return await Customer.find({
            select: ["userName", "fName", "lName"],
            where: {
                userName: Like(`%${userName}%`),
            },

            order: {
                UpdatedAt: "DESC"
            }

        })

    } catch (error) {

        throw error;
    }

};

const getCustomers = () => {
    const Customers = Customer.find()
    return Customers
}


export {
    updateCustomer,
    deleteCustomer,
    login,
    insertUser,
    search_customers
}