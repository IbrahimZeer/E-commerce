import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customers/Customer.js";
import { OrderDetails } from "./OrderDetails.js";
import { Payment } from "../payments/Payment.js";


@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

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

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Partial<Customer>

    @OneToMany(() => OrderDetails, orderDetails => orderDetails.order)
    details: OrderDetails[]

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails[]

    @OneToMany(() => Payment, payment => payment.order)
    payments: Payment[]
}
