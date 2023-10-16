import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, ManyToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Transaction} from './Transaction.js'
@Entity('paymentMethod')
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    paymentTypeName: string;

    @Column()
    paymentTypeCode: string;

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

    @ManyToOne(() => Transaction, (transaction) => transaction.paymentMethod)
    transaction: Partial<Transaction>
}
