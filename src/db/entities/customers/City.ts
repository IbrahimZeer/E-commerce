import { ManyToOne } from "typeorm";
import { Country } from "./Country.js";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinColumn } from "typeorm";


@Entity('city')
export class City extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    CityName: string;

    @PrimaryGeneratedColumn('uuid')
    CountryId: string;

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

    // @ManyToOne(() => Country, country => country.cities, { cascade: true, eager: true, nullable: true })
    // @JoinColumn()
    // country: Country;

}