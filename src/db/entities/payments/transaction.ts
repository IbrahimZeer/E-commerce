import { PaymentNS } from "../../../../@types/type_payment.js";
import { PaymentData } from "./paymentData.js";
import { JoinColumn } from "typeorm";
import { PaymentMethod } from "./paymentMethod.js";
import { ManyToOne } from "typeorm";
import { Order } from "../orders/order.js";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    orderId: string;

    @Column()
    transactionRefNo: string;

    @Column('uuid')
    paymentCode: string;

    @Column()
    amount: string;

    @Column()
    transDate: string;

    @Column()
    ccNo: string;

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

    // @OneToOne(() => PaymentData)
    // @JoinColumn()
    // paymentData: PaymentData

    // @OneToOne(() => PaymentMethod)
    // @JoinColumn()
    // paymentMethod: PaymentMethod

    // @ManyToOne(() => Order, (order) => order.paymentMethod)
    // order: Order

}