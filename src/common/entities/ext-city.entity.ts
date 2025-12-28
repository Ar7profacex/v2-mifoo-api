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
} from 'typeorm';
import { ExtState } from './ext-state.entity';

@Entity({ name: 'ext_cities' })
@Index('ext_cities_fkid_ext_states_index', ['fkid_ext_states'])
export class ExtCity extends BaseEntity {
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
    fkid_ext_states: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    // Relations
    @ManyToOne(() => ExtState, state => state.cities, { nullable: true })
    @JoinColumn({ name: 'fkid_ext_states', referencedColumnName: 'id' })
    state: ExtState | null;
}
