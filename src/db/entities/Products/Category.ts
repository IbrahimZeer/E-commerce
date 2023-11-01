import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Product } from "./Product.js";
import { CategoryProduct } from "./category_product.js";
import { join } from "path";

@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255, nullable: false })
    catName: string;

    @Column({ length: 255, nullable: false })
    catDes: string;

    @Column()
    product: number;

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

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product[]

    // @OneToMany(() => CategoryProduct, categoryProduct => categoryProduct.category)
    // categoryProducts: CategoryProduct[];
}