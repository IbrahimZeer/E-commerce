import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReviewNS } from '../../../@types/type_review';


@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: ReviewNS.Review

    @Column('uuid')
    userId: ReviewNS.Review;

    @Column()
    fullName: ReviewNS.Review;

    @Column('uuid')
    productId: ReviewNS.Review;

    @Column()
    comments: ReviewNS.Review;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    revDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: string;
}