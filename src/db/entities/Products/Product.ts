import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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



}