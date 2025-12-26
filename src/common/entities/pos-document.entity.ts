import { EPaymentMethod, ETypeDocument } from '@ar7profacex/shared';
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
import { PosShift } from './pos-shift.entity';
import { PosPoint } from './pos-point.entity';

@Entity('pos_documents')
@Index('pos_documents_fkid_pos_order_index', ['fkid_pos_order'])
@Index('pos_documents_fkid_pos_point_index', ['fkid_pos_point'])
@Index('pos_documents_fkid_pos_shift_index', ['fkid_pos_shift'])
@Index('pos_documents_number_index', ['number'])
export class PosDocument extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', nullable: true })
    number: number | null;

    @Column({ type: 'double', default: 0 })
    value: number;

    @Column({ type: 'double', default: 0 })
    taxes: number;

    @Column({ type: 'double', default: 0 })
    sub_value: number;

    @Column({ type: 'double', default: 0 })
    value_gratification: number;

    @Column({ type: 'double', default: 0 })
    pay: number;

    @Column({ type: 'double', default: 0 })
    change: number;

    @Column({ type: 'double', default: 0 })
    value_delivery: number;

    @Column({
        type: 'enum',
        enum: ETypeDocument,
        default: ETypeDocument.TICKET,
    })
    type: ETypeDocument;

    @Column({ type: 'varchar', length: 100, nullable: true })
    document: string | null;

    @Column({
        type: 'enum',
        enum: EPaymentMethod,
        default: EPaymentMethod.DEBITO,
    })
    payment_method: EPaymentMethod;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_order: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_point: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_shift: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date | null;

    @ManyToOne(() => PosOrder, (posOrder) => posOrder.posDocuments)
    @JoinColumn({ name: 'fkid_pos_order', referencedColumnName: 'id' })
    posOrder: PosOrder;

    @ManyToOne(() => PosShift, (posShift) => posShift.posDocuments)
    @JoinColumn({ name: 'fkid_pos_shift', referencedColumnName: 'id' })
    posShift: PosShift;

    @ManyToOne(() => PosPoint, (posPoint) => posPoint.posDocuments)
    @JoinColumn({ name: 'fkid_pos_point', referencedColumnName: 'id' })
    posPoint: PosPoint;
}
