export namespace ProductNS {
    export interface Product {
        id: number;
        productNo: number;
        productName: string;
        description: string;
        productPictures:string;
        quantity: number;
        price: number;
        isSold_Active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
    export interface Category {
        id: string,
        catName: string,
        catDescription: string,
        createdAt: Date,
        updatedAt: Date
    }
    export interface Size {
        id: string,
        sizeName: string,
        sizeSymbol: string,
        sizeDescription: string,
        createdAt: Date,
        updatedAt: Date
    }


    export interface Brand {
        id: string,
        brandName: string,
        createdAt: Date,
        updatedAt: Date
    }

    export interface Color {
        id: string,
        colorName: string,
        logo: string,
        createdAt: Date,
        updatedAt: Date
    }

    export interface Attachment {
        id: string,
        fileName: string, // timestamp
        size: string,
        mimeType: string,
        imageURL: string,
        attachSize: 'S' | 'M' | 'L',
        createdAt: Date,
        updatedAt: Date
    }

    export interface Role {
        id: number,
        name: 'customer',
        permission: number
    }
    export interface Permission {
        id: number,
        name: 'chekout' | '' | '',
    }

}