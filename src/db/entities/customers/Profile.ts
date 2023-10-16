import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from './Customer.js'
import { Phone } from "./Phone.js";
import { Country } from "./Country.js";

@Entity('profile')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
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

    @OneToMany(() => Phone, phone => phone.profile)
    phones: Phone[]

    @OneToMany(() => Phone, phone => phone.profile)
    phones: Phone[]

    @OneToOne(() => Country)
    @JoinColumn()
    country: Partial<Country>
}