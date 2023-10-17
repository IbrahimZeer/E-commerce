import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../customers/Profile.js";
import { Transaction } from "./Transaction.js";
import { Order } from "../orders/Order.js";
import { PaymentData } from "./PaymentData.js";

@Entity('payment')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    paymentDate: Date;

    @Column()
    amount: number;

    @ManyToOne(() => Profile, (profile) => profile.payments)
    profile: Partial<Profile>

    @OneToMany(() => Transaction, transaction => transaction.payment)
    transactions: Transaction[]

    @ManyToOne(() => Order, (order) => order.payments)
    order: Partial<Order>

    @OneToOne(() => PaymentData)
    @JoinColumn()
    paymentData: Partial<PaymentData>
}