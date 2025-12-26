import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { PosOrder } from './pos-order.entity';

@Entity('pos_orders_details')
@Index('pos_orders_details_fkid_pos_order_index', ['fkid_pos_order'])
@Index('pos_orders_details_fkid_pos_product_detail_index', ['fkid_pos_product_detail'])
@Index('pos_orders_details_fkid_pos_product_index', ['fkid_pos_product'])
export class PosOrderDetail extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'double', default: 0 })
    value: number;

    @Column({ type: 'longtext', nullable: true })
    dressings: string | null; // JSON

    @Column({ type: 'longtext', nullable: true })
    ingredients: string | null; // JSON

    @Column({ type: 'varchar', length: 255, nullable: true })
    observation: string | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_order: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_product_detail: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_product: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date | null;

    @ManyToOne(() => PosOrder, (posOrder) => posOrder.posOrderDetails)
    @JoinColumn({ name: 'fkid_pos_order', referencedColumnName: 'id' })
    posOrder: PosOrder;
}
