import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";
import { OrderDetails } from "./orderDetails.js";
import { OrderStatus } from "./orderStatus.js";
import { OneToMany } from "typeorm/browser";
import { Product } from "../Products/Product.js";
import { PaymentMethod } from "../payments/paymentMethod.js";

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: OrderNS.Order

    @Column('uuid')
    customerId: OrderNS.Order

    @Column('uuid')
    paymentID: OrderNS.Order

    @Column()
    orderAddress: OrderNS.Order

    @Column()
    productPrice: OrderNS.Order

    @Column()
    deliveryCost: OrderNS.Order

    @Column()
    discount: OrderNS.Order

    @Column()
    totalPrice: OrderNS.Order

    @Column()
    orderDate: OrderNS.Order

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

    //many to many with orderDetails
    @ManyToMany(() => OrderDetails)
    @JoinTable()
    orderDetails: OrderDetails[]
  
    //one to many with  orderStatus
    @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.order)
    orderStatus: OrderStatus

    @ManyToMany(() => Product)
    @JoinTable()
    categories: Product[]
  
    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.order)
    paymentMethod: PaymentMethod[]

}