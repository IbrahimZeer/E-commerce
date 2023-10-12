import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('uuid')
    customerId: string;
    @PrimaryGeneratedColumn('uuid')
    paymentId: string;


    @Column({ length: 255, nullable: false })
    orderAddress: string;

    @Column({ length: 255, nullable: false })
    billingAddress: string;
    @Column({ length: 255, nullable: false })
    productPrice: number;
    @Column({ length: 255, nullable: false })
    deliveryCost: number;
    @Column({ length: 255, nullable: false })
    disCount: number;
    @Column({ length: 255, nullable: false })
    totalPrice: number;


    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    shippingDate: Date;
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    orderDate: Date;


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