export namespace CustomerNS {

    export enum Type {
        customer = 'customer',
        admin = 'admin',
    }
    export interface Customer {
        id: string,
        fName: string,
        lName: string,
        userName: string,
        email: string
        password: string,
        type: Type,
        registrationDate: Date,
        updatedAt: Date,
        profile: any,
        orders: any[],
        carts: any[],
        country: any[]

    }
    export interface Profile {
        id: number,
        age: number,
        profilePic: string,
        createdAt: Date,
        updatedAt: Date,
        phones: any[],
        country: any,
        payments: any[]
    }
    export interface City {
        id: string,
        cityName: string,
        street: string,
        postalCode: string
        createdAt: Date,
        updatedAt: Date,
        country: any
    }


    export interface Phone {
        id: string,
        phoneNo: string,
        createdAt: Date,
        updatedAt: Date,
        profile: any
    }

    export interface Country {
        id: string,
        countryName: string,
        countryCode: string,
        createdAt: Date,
        updatedAt: Date,
        profile: any,
        cities: any[],
        customer: any
    }

}