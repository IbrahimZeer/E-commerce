import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('color')
export class Phone extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    colorName: string;
    
    @Column({ length: 255, nullable: false })
    colorSymbol: string;

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