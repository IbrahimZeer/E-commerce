export namespace AdminNS {

    export interface Admin {
        id: string,
        userName: string,
        email: string
        password: string,
        createdAt: Date,
        role: 'add' | 'update' | 'delete'
    }

    export interface Role {
        id: number,
        name: 'add' | 'update' | 'delete',
        permission: number
    }
    export interface Permission {
        id: number,
        name: 'add_product' | 'update_product' | 'delete_product',
    }

}