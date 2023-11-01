// CategoryProduct.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Category } from './Category.js';
import { Product } from './Product.js';

@Entity('category_product')
export class CategoryProduct {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Category, category => category.categoryProducts)
    // @JoinColumn({ name: 'category_id' })
    // category: Category;

    // @ManyToOne(() => Product, product => product.categoryProducts)
    // @JoinColumn({ name: 'product_id' })
    // product: Product;

    @Column()
    additionalAttribute: string;
}
