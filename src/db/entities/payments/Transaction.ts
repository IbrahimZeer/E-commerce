import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./Payment.js";
import { PaymentMethod } from "./PaymentMethod.js";
import { TransactionStatus } from "./TransactionStatus.js";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @Column()
    transactionDate: Date;

    @ManyToOne(() => Payment, (payment) => payment.transactions)
    payment: Partial<Payment>

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.transaction)
    paymentMethods: PaymentMethod[]

    @ManyToOne(() => TransactionStatus, (transactionStatus) => transactionStatus.transactions)
    transactionStatus: Partial<TransactionStatus>
}
