import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";

@Entity('paymentData')
export class PaymentData extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: PaymentNS.paymentData;

    @Column('uuid')
    transactionId: PaymentNS.paymentData;

    @Column()
    data: PaymentNS.paymentData;

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