import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('order_details')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('uuid')
    orderId: string;
   

    @Column({ length: 255, nullable: false })
    orderNote: string;

    
    @PrimaryGeneratedColumn('uuid')
    status_code: string;
   
  

}