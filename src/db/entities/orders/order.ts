import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";

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



}