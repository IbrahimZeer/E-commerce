import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.js";

@Entity('attachment')
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    fileName: string;
    //note type of file Name  ####


    @Column({ length: 255, nullable: false })
    size: string;

    @Column({ length: 255, nullable: false })
    mimeType: string;


    @Column({ length: 255, nullable: false })
    imageUrl: string;
    ///////////typr of imageUrl s3 ########

    @Column({ length: 255, nullable: false })
    attacSize: string;
    ///Check ..................###
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

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

}