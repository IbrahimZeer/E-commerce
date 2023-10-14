import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";
import { OrderStatus } from "./orderStatus.js";
import { JoinColumn } from "typeorm/browser";

@Entity('status')
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: OrderNS.Status;

    @Column()
    statusName: OrderNS.Status;

    @Column('uuid')
    statusCode: OrderNS.Status;

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

    @OneToOne(() => OrderStatus)
    @JoinColumn()
    orderStatus: OrderStatus
}