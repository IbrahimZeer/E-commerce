import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { OneToMany } from "typeorm";
import { Size } from "./Size.js";
import { Color } from "./Color.js";
import { Category } from "./Category.js";
import { ManyToOne } from "typeorm";
import { Brand } from "./Brand.js";

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productNo: number;

    @Column()
    productName: string;

    @PrimaryGeneratedColumn('uuid')
    catId: string;


    @Column()
    discription: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    //image

    @PrimaryGeneratedColumn('uuid')
    attatchId: string;

    @Column()
    isSoled_Active: boolean;

    @PrimaryGeneratedColumn('uuid')
    brandId: string;

    @PrimaryGeneratedColumn('uuid')
    colorId: string;

    @PrimaryGeneratedColumn('uuid')
    sizeId: string;

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


    // @OneToMany(() => Size, (size) => size.product)
    // size: Size[]
    // @OneToMany(() => Color, (color) => color.product)
    // color: Color[]

    //many to many
    // @ManyToOne(() => Category, (category) => category.product)
    // category: Category

    // @ManyToOne(() => Brand, (brand) => brand.products)
    // brand: Brand

}