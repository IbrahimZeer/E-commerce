export namespace OrderNS {

    export interface Order {
        id: string,
        orderNo: number,
        orderAddress: string,
        productPrice: number,
        deliveryCost: number,
        discount: number,
        totalPrice: number,
        orderDate: Date,
        orderUpdated: Date,
        customer: any,
        details: any[],
        orderDetails: any[],
        payments: any[]
    }
    export interface OrderDetails {
        id: string,
        quantity: number,
        pricePerUnit: number,
        price: number,
        createdAt: Date,
        updatedAt: Date,
        order: any,
        product: any
    }
    export interface OrderStatus {
        id: string,
        orderNote: string,
        createdAt: Date,
        updatedAt: Date,
    }


    export interface Status {
        id: string,
        statusName: string,
        statusCode: string,
        createdAt: Date,
        updatedAt: Date
    }
}