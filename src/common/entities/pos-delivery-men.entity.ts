import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { ExtCity } from './ext-city.entity';

@Entity({ name: 'pos_delivery_men' })
@Index('pos_delivery_men_fkid_ext_city_index', ['fkidExtCity'])
export class PosDeliveryMan extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    run: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    dv: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string | null;

    @Column({ name: 'fkid_ext_city', type: 'bigint', nullable: true })
    fkidExtCity: string | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date;

    @OneToOne(() => ExtCity)
    @JoinColumn({ name: 'fkid_ext_city', referencedColumnName: 'id' })
    extCity: ExtCity;
}
