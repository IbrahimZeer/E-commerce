import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";

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
}