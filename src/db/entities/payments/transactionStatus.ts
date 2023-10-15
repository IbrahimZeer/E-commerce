import { Transaction } from "./transaction.js";
import { JoinColumn } from "typeorm";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";

@Entity('transactionStatus')
export class TransactionStatus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    statusName: string;

    @Column()
    statusCode: string;

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

    // @OneToOne(() => Transaction)
    // @JoinColumn()
    // transaction: Transaction
}