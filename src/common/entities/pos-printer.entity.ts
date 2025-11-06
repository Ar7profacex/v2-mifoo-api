import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { PosPoint } from './pos-point.entity';
import { ConfirmacionEnum, EConnectionPrinter, IPrinterConfig } from '@ar7profacex/shared';

@Entity('pos_printers')
export class PosPrinter extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    path?: string;

    @Column({ type: 'longtext', nullable: true })
    config?: IPrinterConfig; //  Puedes usar `Record<string, any>` si parseas JSON al usarla

    @Column({
        type: 'enum',
        enum: ConfirmacionEnum,
        default: ConfirmacionEnum.SI,
    })
    default: ConfirmacionEnum;

    @Column({
        type: 'enum',
        enum: EConnectionPrinter,
        default: EConnectionPrinter.SOCKET,
    })
    connection: EConnectionPrinter;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_pos_point?: number;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

    @ManyToOne(() => PosPoint, (posPoint) => posPoint.printers, { nullable: true })
    @JoinColumn({ name: 'fkid_pos_point' })
    posPoint?: PosPoint;
}
