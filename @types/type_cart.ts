export namespace CartNs {

    export interface Cart {
        id: string,
        userId: string,
        productId: string,
        quantity: string,
        isPuecashed: boolean,
        createdAt: Date,
        UpdatedAt: Date
    }
}