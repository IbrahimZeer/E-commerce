
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Customer } from "./customers/Customer.js";
import { Product } from "./Products/Product.js";
import { OrderDetails } from "./orders/OrderDetails.js";

@Entity('cart')
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    quantity: number;

    @Column({
        type: 'enum',
        enum: ['inOrder', 'outOrder'],
        default: 'inOrder'
    })
    inOrder: 'inOrder' | 'outOrder';

    @Column()
    price: number;

    @Column()
    totalPrice: number;

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


    @OneToMany(() => OrderDetails, orderDetails => orderDetails.product)
    details: OrderDetails[]

    // @ManyToOne(() => Customer, customer => customer.carts)
    // customer: Partial<Customer>

    // @OneToOne(() => Customer)
    // @JoinColumn()
    // customer: Partial<Customer>

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product[]
}