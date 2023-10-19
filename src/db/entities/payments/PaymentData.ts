import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_data')
export class PaymentData extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cardholderName: string;

    @Column()
    cardNo: number;

    @Column()
    exp: Date;

    @Column()
    cvv: number;

    @Column()
    billingAddress: string;
}
