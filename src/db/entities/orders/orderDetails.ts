import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderNS } from "../../../../@types/type_order.js";

@Entity('orderDetails')
export class OrderDetails extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: OrderNS.OrderDetails;

    @Column('uuid')
    orderId: OrderNS.OrderDetails;

    @Column('uuid')
    productId: OrderNS.OrderDetails;

    @Column()
    quantity: OrderNS.OrderDetails;

    @Column()
    pricePerUnit: OrderNS.OrderDetails;

    @Column()
    price: OrderNS.OrderDetails;

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