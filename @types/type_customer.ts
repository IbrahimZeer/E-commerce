export namespace CustomerNS {

    export interface Customer {
        id: string,
        fName: string,
        lName: string,
        userName: string,
        email: string
        password: string,
        createdAt: Date,
        updatedAt: Date,
        role: 'customer'
    }
    export interface Profile {
        id: string,
        cityId: string,
        countryId: string,
        phoneId: string,
        createdAt: Date,
        updatedAt: Date
    }
    export interface City {
        id: string,
        cityName: string,
        countryId: string,
        street: string,
        postalCode: string
        createdAt: Date,
        updatedAt: Date
    }


    export interface Phone {
        id: string,
        phoneNo: string,
        createdAt: Date,
        updatedAt: Date
    }

    export interface Country {
        id: string,
        countryName: string,
        countryCode: string,
        createdAt: Date,
        updatedAt: Date
    }

    export interface Role {
        id: number,
        name: 'customer',
        permission: number
    }
    export interface Permission {
        id: number,
        name: 'chekout' | '' | '',
    }

}