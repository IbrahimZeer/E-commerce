import { ManyToOne, OneToMany } from "typeorm";
import { City } from "./City.js";
import { BaseEntity, Column, Entity, CreateDateColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.js";
import { Customer } from "./Customer.js";


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
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @ManyToOne(() => Profile, profile => profile.country)
    profile: Partial<Profile>

    @OneToMany(() => City, city => city.country)
    cities: City[]

    @ManyToOne(() => Customer, customer => customer.country)
    customer: Partial<Customer>

}