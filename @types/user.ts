export namespace UserNS {

    export interface User {
        id: string,
        userName: string,
        displayName: string,
        email: string
        password: string,
        createdAt: Date,
        role: 'user' | 'admin' | 'editor'
    }



}