import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('order_status')
export class Order_status extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('uuid')
    orderId: string;
   

    @Column({ length: 255, nullable: false })
    orderNote: string;

    
    @PrimaryGeneratedColumn('uuid')
    status_code: string;
   
  

}