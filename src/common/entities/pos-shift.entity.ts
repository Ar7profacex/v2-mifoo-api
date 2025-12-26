import { EStatusShift, IPosShiftFreeze } from '@ar7profacex/shared';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
    BaseEntity,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { PosDocument } from './pos-document.entity';
import { PosOrder } from './pos-order.entity';


@Entity('pos_shifts')
@Index('pos_shifts_uuid_unique', ['uuId'], { unique: true })
export class PosShift extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'char', length: 36 })
    uuId: string;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_point: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_user_opened: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_user_closed: number | null;

    @Column({ type: 'timestamp', nullable: true })
    opened_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    closed_at: Date | null;

    @Column({ type: 'double', default: 0 })
    opening_amount: number;

    @Column({ type: 'double', default: 0 })
    closeing_amount: number;

    @Column({ type: 'double', default: 0 })
    expected_amount: number;

    @Column({
        type: 'enum',
        enum: EStatusShift,
        default: EStatusShift.open,
    })
    status: EStatusShift;

    @Column({ type: 'varchar', length: 255, nullable: true })
    observation: string | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date | null;

    @Column({
        type: 'longtext',
        nullable: true,
        transformer: {
            to: (value: IPosShiftFreeze | null) =>
                value ? JSON.stringify(value) : null,
            from: (value: string | null): IPosShiftFreeze | null =>
                value ? JSON.parse(value) : null,
        },
    })
    dataFreeze: IPosShiftFreeze | null;

    @OneToMany(() => PosDocument, (posDocument) => posDocument.posShift)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_pos_shift' })
    posDocuments: PosDocument[];

    @OneToMany(() => PosOrder, (posOrder) => posOrder.posShift)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_pos_shift' })
    posOrders: PosOrder[];
}
