import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
    BaseEntity,
} from 'typeorm';
import { PosPrinter } from './pos-printer.entity';
import { PosMarket } from './pos-market.entity';
import { ConfirmacionEnum } from '@ar7profacex/shared';

@Entity('pos_points')
@Unique(['code'])
export class PosPoint extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'int', nullable: true })
    number?: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    code?: string;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_pos_market?: number;

    @Column({
        type: 'enum',
        enum: ConfirmacionEnum,
        default: ConfirmacionEnum.SI,
    })
    active: ConfirmacionEnum;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

    @OneToMany(() => PosPrinter, (printer) => printer.posPoint)
    printers?: PosPrinter[];

    @ManyToOne(() => PosMarket, (market) => market.points, { nullable: true })
    @JoinColumn({ name: 'fkid_pos_market' })
    posMarket?: PosMarket;
}
