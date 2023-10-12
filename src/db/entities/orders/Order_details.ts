import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('order_details')
export class Order_details extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('uuid')
    orderId: string;
    @PrimaryGeneratedColumn('uuid')
    productId: string;


    @Column({ length: 255, nullable: false })
    quantity: number;

    @Column({ length: 255, nullable: false })
    price_per_unit: number;


    @Column({ length: 255, nullable: false })
    price: number;

}