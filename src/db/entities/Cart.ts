import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Customer } from "./customers/Customer.js";
import { Product } from "./Products/Product.js";
import { OrderDetails } from "./orders/OrderDetails.js";


@Entity('cart')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    isPuecashed: boolean;

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

    @ManyToOne(() => Customer, customer => customer.carts)
    customer: Partial<Customer>

    @OneToMany(() => OrderDetails, orderDetails => orderDetails.product)
    details: OrderDetails[]
}