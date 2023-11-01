import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Profile } from '../db/entities/customers/Profile.js';
import { Like } from 'typeorm';
import { Cart } from '../db/entities/Cart.js';
import { Phone } from '../db/entities/customers/Phone.js';
import { Country } from '../db/entities/customers/Country.js';
import { Payment } from '../db/entities/payments/Payment.js';
import e from 'express';



const insertUser = async (payload: Customer) => {
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


const updateCustomer = async (payload: Customer, custmerEmail: string) => {
    const customer = await Customer.findOneBy({ email: custmerEmail })
    if (!customer) {
        throw new Error('user not found')
    }
    if (payload.fName) { customer.fName = payload.fName }
    if (payload.lName) { customer.lName = payload.lName }
    if (payload.password) { customer.password = payload.password }
    await customer.save()
    return customer;
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