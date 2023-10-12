import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({ length: 255, nullable: false })
    StatusName: string;

    @Column({ nullable: false })
    statusCode: boolean;

}