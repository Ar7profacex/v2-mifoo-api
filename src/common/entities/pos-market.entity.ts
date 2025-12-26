import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm';
import { PosPoint } from './pos-point.entity';
import { PosCompany } from './pos-company.entity';
import { ConfirmacionEnum, IConfigMarket } from '@ar7profacex/shared';

@Entity('pos_markets')
@Unique(['code'])
export class PosMarket extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    code?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address?: string;

    @Column({
        type: 'longtext', nullable: true,
        transformer: {
            to: (value: any) => (value ? JSON.stringify(value) : null),
            from: (value: string) => {
                try {
                    return value ? JSON.parse(value) : null;
                } catch {
                    return value;
                }
            },
        },
    })
    config?: IConfigMarket;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_ext_unity?: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_ext_city?: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    fkid_pos_company?: number;

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

    @OneToMany(() => PosPoint, (point) => point.posMarket)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_pos_market' })
    points?: PosPoint[];

    @ManyToOne(() => PosCompany, (company) => company.markets, { nullable: true })
    @JoinColumn({ name: 'fkid_pos_company', referencedColumnName: 'id' })
    posCompany?: PosCompany;
}
