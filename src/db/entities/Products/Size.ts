import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { ManyToOne } from "typeorm";

@Entity('size')
export class Size extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    sizeName: string;

    @Column({ length: 255, nullable: false })
    sizeSymblo: string;

    @Column({ length: 255, nullable: false })
    sizeDesc: string;

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
  
///////////many to many
    @ManyToOne(() => Product, (product) => product.size)
    product: Product

}