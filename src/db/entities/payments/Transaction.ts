import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "./PaymentMethod.js";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    transactionRefNo: number;

    @Column()
    amount: number;

    @Column()
    transDate: Date;

    @Column()
    ccNo: number;

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

    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.transaction)
    paymentMethod: PaymentMethod[]

}
