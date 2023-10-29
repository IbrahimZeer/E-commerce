export namespace PaymentNS {

    export interface payment {
        id: string,
        paymentDate: Date,
        amount: string,
        profile: any,
        transactions: any[],
        order: any,
        paymentData: any
    }
    export interface transaction {
        id: string,
        amount: string
        transDate: Date,
        payment: any,
        paymentMethods: any[],
        transactionStatus: any
    }
    export interface transactionStatus {
        id: string,
        statusName: string,
        statusCode: boolean,
        transactions: any[]
    }
    export interface paymentMethod {
        id: string,
        methodName: string,
        description: string,
        transaction: any
    }


    export interface paymentData {
        id: string,
        cardholderName: string,
        cardNo: number,
        exp: Date,
        cvv: number,
        billingAddress: string
    }

}