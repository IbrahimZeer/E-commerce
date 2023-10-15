import { PaymentNS } from "../../../../@types/type_payment.js";
import { PaymentMethod } from "./paymentMethod.js";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('paymentData')
export class PaymentData extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    transactionId: string;

    @Column()
    data: string;

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

    // @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.paymentData)
    // paymentMethod: PaymentMethod[]
}