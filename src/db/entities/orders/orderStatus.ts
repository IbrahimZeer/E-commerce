import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";
import { Order } from "./order.js";
import { OneToMany } from "typeorm";

@Entity('orderStatus')
export class OrderStatus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    orderId: string;

    @Column('uuid')
    orderNote: string;

    @Column('uuid')
    statusCode: string;

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

    //orederStatus OneToOne With status   
    // @OneToMany(() => Order, (order) => order.orderStatus)
    // order: Order
}