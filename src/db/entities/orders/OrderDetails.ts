import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order.js";
import { Product } from "../Products/Product.js";

@Entity('order_details')
export class OrderDetails extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    pricePerUnit: number;

    @Column()
    price: number;

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

    @ManyToOne(() => Order, (order) => order.orderDetails)
    order: Partial<Order>
    
    @ManyToOne(() => Product, product => product.orderDetails)
    product: Partial<Product>
}