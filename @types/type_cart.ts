export namespace CartNs {

    export interface Cart {
        id: string,
        quantity: string,
        isPuecashed: boolean,
        createdAt: Date,
        UpdatedAt: Date,
        details: any[],
        customer: any,
        product: any
    }
}