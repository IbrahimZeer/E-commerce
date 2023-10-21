export namespace CartNs {

    export interface Cart {
        id: number,
        quantity: number,
        isPuecashed: boolean,
        createdAt: Date,
        UpdatedAt: Date,
        details: any[],
        customer: any,
        product: any
    }
}