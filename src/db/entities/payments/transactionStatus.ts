import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";
import { Transaction } from "./transaction.js";
import { JoinColumn } from "typeorm/browser";

@Entity('transactionStatus')
export class TransactionStatus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: PaymentNS.transactionStatus;

    @Column()
    statusName: PaymentNS.transactionStatus;

    @Column()
    statusCode: PaymentNS.transactionStatus;

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
    @OneToOne(() => Transaction)
    @JoinColumn()
    transaction: Transaction
}