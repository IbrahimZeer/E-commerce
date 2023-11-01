import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products/Product.js";
import { Customer } from "./customers/Customer.js";

@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fullName: string;

    @Column()
    rate: number;

    @Column()
    comments: string;

    @Column()
    product: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    revDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.reviews)
    @JoinColumn()
    customer: Partial<Customer>;

    // @ManyToOne(() => Product)
    // prod: Partial<Product>;
}
