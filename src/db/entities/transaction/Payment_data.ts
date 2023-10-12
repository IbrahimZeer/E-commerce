import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_data')
export class Payment_data extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('uuid')
    transactionId: string;

    @Column({ length: 255, nullable: false })
   data: JSON;
   //Note Types

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
}