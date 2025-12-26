import { EPrintQueueStatus, EPrintQueueType } from '@ar7profacex/shared';
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity({ name: 'pos_print_queue' })
export class PosPrintQueue extends BaseEntity {
    @PrimaryColumn({ type: 'char', length: 36 })
    id: string;

    @Column({ type: 'char', length: 36 })
    printer: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    document: string | null;

    @Column({
        type: 'enum',
        enum: EPrintQueueStatus,
        default: EPrintQueueStatus.PENDING,
    })
    status: EPrintQueueStatus;

    @Column({ type: 'varchar', length: 255, nullable: true })
    observation: string | null;

    @Column({
        type: 'longtext',
        nullable: true,
    })
    info: string | null;

    @Column({ type: 'timestamp', nullable: true })
    print_date: Date | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    @Column({ type: 'longtext', nullable: true })
    data: string | null;

    @Column({
        type: 'enum',
        enum: EPrintQueueType,
        default: EPrintQueueType.DOCUMENT,
        nullable: true,
    })
    type: EPrintQueueType | null;
}
