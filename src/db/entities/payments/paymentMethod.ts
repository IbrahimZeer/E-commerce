import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentNS } from "../../../../@types/type_payment.js";
import { PaymentData } from "./paymentData.js";

@Entity('paymentMethod')
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: PaymentNS.paymentMethod;

    @Column()
    paymentTypeName: PaymentNS.paymentMethod;

    @Column()
    paymentTypeCode: PaymentNS.paymentMethod;

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
    @ManyToOne(() => PaymentData, (paymentData) => paymentData.paymentMethod)
    paymentData: PaymentData
}