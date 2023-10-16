import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails.js";

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    orderAddress: string

    @Column()
    productPrice: number

    @Column()
    deliveryCost: number

    @Column()
    discount: number

    @Column()
    totalPrice: number

    @Column()
    orderDate: Date

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: Date;

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails[]
}
