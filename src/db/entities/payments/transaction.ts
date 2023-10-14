import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";
import { PaymentData } from "./paymentData.js";
import { JoinColumn } from "typeorm/browser";
import { PaymentMethod } from "./paymentMethod.js";
import { ManyToOne } from "typeorm/browser";
import { Order } from "../orders/order.js";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: PaymentNS.transaction;

    @Column('uuid')
    orderId: PaymentNS.transaction;

    @Column()
    transactionRefNo: PaymentNS.transaction;

    @Column('uuid')
    paymentCode: PaymentNS.transaction;

    @Column()
    amount: PaymentNS.transaction;

    @Column()
    transDate: PaymentNS.transaction;

    @Column()
    ccNo: PaymentNS.transaction;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: string;
    @OneToOne(() => PaymentData)
    @JoinColumn()
    paymentData: PaymentData

    @OneToOne(() => PaymentMethod)
    @JoinColumn()
    paymentMethod: PaymentMethod
    @ManyToOne(() => Order, (order) => order.paymentMethod)
    order: Order
}