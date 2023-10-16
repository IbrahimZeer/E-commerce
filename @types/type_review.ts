export namespace ReviewNS {

    export interface Review {
        id: string,
        userId: string,
        fullName: string,
        productId: string,
        comment: string,
        revDate: Date,
        UpdatedAt: Date
    }
}