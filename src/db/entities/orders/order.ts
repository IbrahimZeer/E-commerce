import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";
import { OrderDetails } from "./orderDetails.js";
import { OrderStatus } from "./orderStatus.js";
import { OneToMany } from "typeorm";
import { Product } from "../Products/Product.js";
import { PaymentMethod } from "../payments/paymentMethod.js";

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    customerId: string

    @Column('uuid')
    paymentID: string

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


    // //many to many with orderDetails
    // @ManyToMany(() => OrderDetails)
    // @JoinTable()
    // orderDetails: OrderDetails[]

    // //one to many with  orderStatus
    // @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.order)
    // orderStatus: OrderStatus

    // @ManyToMany(() => Product)
    // @JoinTable()
    // categories: Product[]

    // @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.order)
    // paymentMethod: PaymentMethod[]

}