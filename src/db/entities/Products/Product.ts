import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { OneToMany } from "typeorm";
import { Size } from "./Size";
import { Color } from "./Color";
import { Category } from "./Category";
import { ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    productNo: number;

    @Column({ length: 255, nullable: false })
    productName: string;

    @PrimaryGeneratedColumn('uuid')
    catId: string;


    @Column({ length: 255, nullable: false })
    discription: string;

    @Column({ length: 255, nullable: false })
    quantity: number;

    @Column({ length: 255, nullable: false })
    price: number;

    //image

    @PrimaryGeneratedColumn('uuid')
    attatchId: string;

    @Column({ length: 255, nullable: false })
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


    @OneToMany(() => Size, (size) => size.product)
    size: Size[]
    @OneToMany(() => Color, (color) => color.product)
    color: Color[]
    
    //many to many
    @ManyToOne(() => Category, (category) => category.product)
    category: Category

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand

}