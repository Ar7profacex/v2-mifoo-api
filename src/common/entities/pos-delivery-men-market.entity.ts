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
import { PosMarket } from './pos-market.entity';
import { PosDeliveryMan } from './pos-delivery-men.entity';

@Entity({ name: 'pos_delivery_men_markets' })
@Index('pos_delivery_men_markets_fkid_pos_delivery_man_index', ['fkidPosDeliveryMan'])
@Index('pos_delivery_men_markets_fkid_pos_market_index', ['fkidPosMarket'])
export class PosDeliveryManMarket extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string;

    @Column({ name: 'fkid_pos_market', type: 'bigint', nullable: true })
    fkidPosMarket: string | null;

    @Column({ name: 'fkid_pos_delivery_man', type: 'bigint', nullable: true })
    fkidPosDeliveryMan: string | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date;

    @OneToOne(() => PosMarket)
    @JoinColumn({ name: 'fkid_pos_market', referencedColumnName: 'id' })
    posMarket: PosMarket;

    @OneToOne(() => PosDeliveryMan)
    @JoinColumn({ name: 'fkid_pos_delivery_man', referencedColumnName: 'id' })
    posDeliveryMan: PosDeliveryMan;
}
