import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { Size } from "./Size.js";
import { Color } from "./Color.js";
import { Category } from "./Category.js";
import { ManyToOne } from "typeorm";
import { Brand } from "./Brand.js";
import { OrderDetails } from "../orders/OrderDetails.js";
import { Cart } from "../Cart.js";

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productNo: number;

    @Column()
    productName: string;

    @Column()
    discription: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    isSoled_Active: boolean;

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

    @ManyToOne(() => Category, category => category.products)
    category: Partial<Category>


    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
    orderDetails: OrderDetails[]


    //  @OneToMany(() => Cart, (cart) => cart.product)
    //  cart: Cart[]
}