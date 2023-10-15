import { PaymentNS } from "../../../../@types/type_payment.js";
import { PaymentData } from "./PaymentData.js";
import { Order } from "../orders/Order.js";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";

@Entity('paymentMethod')
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: PaymentNS.paymentMethod;

    @Column()
    paymentTypeName: PaymentNS.paymentMethod;

    @Column()
    paymentTypeCode: PaymentNS.paymentMethod;

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

    @ManyToOne(() => PaymentData, (paymentData) => paymentData.paymentMethod)
    paymentData: PaymentData

    @ManyToOne(() => Order, (order) => order.paymentMethod)
    order: Order
}