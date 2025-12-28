import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Index,
    JoinColumn,
    BaseEntity,
} from 'typeorm';
import { ExtState } from './ext-state.entity';
import { ExtUnity } from './ext-unity.entity';

@Entity({ name: 'ext_countries' })
export class ExtCountry extends BaseEntity {
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

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    // Relations
    @OneToMany(() => ExtState, state => state.country)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_ext_country' })
    states: ExtState[];

    @OneToMany(() => ExtUnity, unity => unity.country)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_ext_country' })
    unities: ExtUnity[];
}
