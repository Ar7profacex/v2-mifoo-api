import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Index,
    BaseEntity,
} from 'typeorm';
import { UserData } from './user-data.entity';

@Entity({ name: 'sys_profiles' })
@Index(['profile'], { unique: true })
export class SysProfile extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    profile: string;

    @Column({
        type: 'enum',
        enum: ['activo', 'bloqueado'],
        default: 'activo',
    })
    state: 'activo' | 'bloqueado';

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    /** RELATIONS */
    @OneToMany(() => UserData, (ud) => ud.profile)
    users: UserData[];
}
