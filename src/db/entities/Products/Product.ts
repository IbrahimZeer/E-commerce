import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { Size } from "./Size.js";
import { Color } from "./Color.js";
import { Category } from "./Category.js";
import { ManyToOne } from "typeorm";
import { Brand } from "./Brand.js";
import { OrderDetails } from "../orders/OrderDetails.js";
import { Cart } from "../Cart.js";
@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    productNo: number;

    @Column()
    productName: string;

    @Column()
    description: string; // Corrected property name
    @Column()
    productPictures: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: ['inOrder', 'outOrder'],
        default: 'inOrder'
    })
    inOrder: 'inOrder' | 'outOrder';

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()'
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()'
    })
    UpdatedAt: Date; // Corrected property name


    @ManyToOne(() => Category, category => category.products)
    category: Partial<Category>

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
    orderDetails: OrderDetails[]

    // @ManyToMany(() => Cart, (cart) => cart.products)
    // cart: Partial<Cart>
}