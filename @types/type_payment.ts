export namespace PaymentNS {

    export interface transaction {
        id: string,
        orderId: string,
        transRefNo: string,
        paymentCode: string,
        amount: string
        transDate: Date,
        ccNo: number,
        createdAt: Date,
        updatedAt: Date
    }
    export interface transactionStatus {
        id: string,
        statusName: string,
        statusCode: boolean,
        createdAt: Date,
        updatedAt: Date
    }
    export interface paymentMethod {
        id: string,
        paymentTypeName: string,
        paymentTypeCode: string,
        createdAt: Date,
        updatedAt: Date
    }


    export interface paymentData {
        id: string,
        transactionId: string,
        data: any,
        createdAt: Date,
        updatedAt: Date
    }

}