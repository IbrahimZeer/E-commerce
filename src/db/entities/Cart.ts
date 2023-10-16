import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Customer } from "./customers/Customer.js";
import { Product } from "./Products/Product.js";


@Entity('cart')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
 
    @Column()
    quantity: string;

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

    @Column()
    isPuecashed: boolean;

    
    //  @ManyToOne(() => Customer, customer => customer.cart)
    //   customer: Partial<Customer>


    //  @ManyToOne(() => Product, product => product.cart)
    // product: Partial<Product>
}