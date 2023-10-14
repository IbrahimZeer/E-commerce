import { BaseEntity,ManyToOne, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Profile } from "./Profile.js";
import { Phone } from "./Phone.js";
import { Country } from "./Country.js";
@Entity('customer')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    fName: string;

    @Column({ length: 255, nullable: false })
    lName: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string;

    @PrimaryGeneratedColumn('uuid')
    profiled: string;

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
    @OneToOne(() => Profile, profile => profile.customer, { eager: true })
    profile: Partial<Profile>;

    @OneToOne(() => Phone, phone => phone.customer, { eager: true })
    phone: Partial<Phone>;

    @ManyToOne(() => Country,
        (country) => country.customer)
      country: Country;

}