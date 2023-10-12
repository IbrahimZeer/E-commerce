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