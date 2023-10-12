import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_method')
export class Payment_method extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    pay_typ_name: string;

    @PrimaryGeneratedColumn('uuid')
    pay_type_code: string;
}