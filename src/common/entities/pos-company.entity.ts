import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { PosMarket } from './pos-market.entity';
import { ConfirmacionEnum } from '@ar7profacex/shared';

@Entity('pos_companies')
@Unique(['run'])
export class PosCompany extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    razon?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    run?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    dv?: string;

    @Column({
        type: 'enum',
        enum: ConfirmacionEnum,
        default: ConfirmacionEnum.SI,
    })
    active: ConfirmacionEnum;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_ext_city?: number;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

    @OneToMany(() => PosMarket, (market) => market.posCompany)
    markets?: PosMarket[];
}
