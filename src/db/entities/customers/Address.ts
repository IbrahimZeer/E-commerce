import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    BaseEntity,
    ManyToMany,
    JoinTable
  } from 'typeorm';
  import { City } from './City.js';
import { Customer } from './Customer.js';
  
  @Entity('address')
  export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text', nullable: false })
    street: string;
  
    @Column({ type: 'text', nullable: false })
    postalCode: string;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;
  
    @ManyToOne(() => City, (city) => city.addresses)
    @JoinColumn({ name: 'city_id' })
    city: Partial<City>;
    @ManyToMany(() => Customer)
    @JoinTable()
    customer: Customer[]
    // Additional relationships, e.g., with Country
  
    // ...
  }