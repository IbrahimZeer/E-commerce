export namespace OrderNS {

    export interface Order {
        id: string,
        orderAddress: string,
        productPrice: number,
        deliveryCost: number,
        discount: number,
        totalPrice: number,
        orderDate: Date,
        orderUpdated: Date,
    }
    export interface OrderDetails {
        id: string,
        orderId: string,
        productId: string,
        quantity: number,
        pricePerUnit: number,
        price: number,
        createdAt: Date,
        updatedAt: Date
    }
    export interface OrderStatus {
        id: string,
        orderId: string,
        orderNote: string,
        statusCode: string,
        createdAt: Date,
        updatedAt: Date
    }


    export interface Status {
        id: string,
        statusName: string,
        statusCode: string,
        createdAt: Date,
        updatedAt: Date
    }
}