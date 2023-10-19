import { ManyToOne } from "typeorm";
import { Country } from "./Country.js";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('city')
export class City extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    CityName: string;

    @Column({ length: 255, nullable: false })
    street: string;

    @Column({ length: 255, nullable: false })
    postalCode: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    UpdatedAt: string;

    @ManyToOne(() => Country, country => country.cities)
    country: Partial<Country>
}