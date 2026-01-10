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
import { PosContact } from './pos-contact.entity';

@Entity({ name: 'pos_contacts_markets' })
@Index('pos_contacts_markets_fkid_pos_contact_index', ['fkidPosContact'])
@Index('pos_contacts_markets_fkid_pos_market_index', ['fkidPosMarket'])
export class PosContactMarket extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string;

    @Column({ name: 'fkid_pos_market', type: 'bigint', nullable: true })
    fkidPosMarket: string | null;

    @Column({ name: 'fkid_pos_contact', type: 'bigint', nullable: true })
    fkidPosContact: string | null;

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

    @OneToOne(() => PosContact)
    @JoinColumn({ name: 'fkid_pos_contact', referencedColumnName: 'id' })
    posContact: PosContact;
}
