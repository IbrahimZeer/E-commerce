import { City } from "./City";
import { Customer } from "./Customer";
import { BaseEntity, Column, Entity, CreateDateColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('country')
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    CountryName: string;

    @Column({ nullable: false })
    CountryCode: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    updatedAt: Date;

    @OneToMany(() => City, city => city.country)
    cities: City[];

    @OneToMany(() => Customer, customer => customer.country)
    customer: Customer[];
}