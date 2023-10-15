import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReviewNS } from '../../../@types/type_review.js';
import { Customer } from "./customers/Customer.js";
import { OneToMany } from "typeorm";


@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string;

    @Column()
    fullName: string;

    @Column('uuid')
    productId: string;

    @Column()
    comments: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    revDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: string;

    // @OneToMany(() => Customer, (customer) => customer.review)
    // customer: Customer[]
}