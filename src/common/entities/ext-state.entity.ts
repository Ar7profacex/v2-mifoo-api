import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { ExtCountry } from './ext-country.entity';
import { ExtCity } from './ext-city.entity';

@Entity({ name: 'ext_states' })
@Index('ext_states_fkid_ext_country_index', ['fkid_ext_country'])
export class ExtState extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    alias: string | null;

    @Column({
        type: 'longtext',
        nullable: true,
        transformer: {
            to: (value: any) => (value ? JSON.stringify(value) : null),
            from: (value: string) => (value ? JSON.parse(value) : null),
        },
    })
    info: Record<string, any> | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_ext_country: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    @OneToMany(() => ExtCity, city => city.state)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_ext_state' })
    cities: ExtCity[];

    // Relations
    @ManyToOne(() => ExtCountry, country => country.states, { nullable: true })
    @JoinColumn({ name: 'fkid_ext_country' })
    country: ExtCountry | null;
}
