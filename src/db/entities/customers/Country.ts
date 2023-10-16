import { ManyToOne, OneToMany } from "typeorm";
import { City } from "./City.js";
import { BaseEntity, Column, Entity, CreateDateColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.js";


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

    @ManyToOne(() => Profile, profile => profile.countries)
    profile: Profile


    @OneToMany(() => City, city => city.country)
    cities: City[]
}