import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction.js";

@Entity('transactionStatus')
export class TransactionStatus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    statusName: string;

    @Column()
    statusCode: string;

    @OneToMany(() => Transaction, transaction => transaction.transactionStatus)
    transactions: Transaction[]
}
