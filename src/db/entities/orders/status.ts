import { OrderStatus } from "./orderStatus.js";
import { JoinColumn } from "typeorm";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";

@Entity('status')
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    statusName: string;

    @Column('uuid')
    statusCode: string;

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

    // @OneToOne(() => OrderStatus)
    // @JoinColumn()
    // orderStatus: OrderStatus
}