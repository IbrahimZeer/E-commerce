import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, ManyToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Transaction } from './Transaction.js'

@Entity('paymentMethod')
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    methodName: string;

    @Column()
    description: string;


    @ManyToOne(() => Transaction, (transaction) => transaction.paymentMethods)
    transaction: Partial<Transaction>
}
