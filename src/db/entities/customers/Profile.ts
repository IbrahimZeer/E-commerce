import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from './Customer.js'

@Entity('profile')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    street: string;


    @PrimaryGeneratedColumn('uuid')
    cityId: string;

    @PrimaryGeneratedColumn('uuid')
    countryId: string;

    @Column({ length: 255, nullable: false })
    postalCode: string;


    @PrimaryGeneratedColumn('uuid')
    phoneId: string;

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


    @OneToOne(() => Customer, customer => customer.profile)
    @JoinColumn()
    customer: Partial<Customer>;
}