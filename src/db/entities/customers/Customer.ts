import { BaseEntity, ManyToOne, JoinColumn, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';
import { Profile } from "./Profile.js";
import { Country } from "./Country.js";
import { Review } from "../Review.js";
import { Order } from "../orders/Order.js";
import { Role } from "../Role.js";
import { Cart } from "../Cart.js";
import { Payment } from "../payments/Payment.js";

@Entity('customer')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    fName: string;

    @Column({ length: 255, nullable: false })
    lName: string;

    @Column()
    userName: string;

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

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    registrationDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    UpdatedAt: Date;


    // @Column({
    //     type: 'enum',
    //     enum: ['admin', 'customer'],
    //     default: 'customer'
    // })
    // type: 'customer' | 'admin';

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Partial<Profile>;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]

    @OneToMany(() => Cart, cart => cart.customer)
    carts: Cart[]

    @OneToMany(() => Country, country => country.customer)
    country: Order[]
}