import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    Index,
    BaseEntity,
} from 'typeorm';
import { User } from './user.entity';
import { SysProfile } from './sys-profile.entity';

@Entity({ name: 'users_data' })
@Index(['fkid_profile'])
@Index(['fkid_user'])
export class UserData extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 250, nullable: true })
    avatar: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone: string | null;

    @Column({ type: 'date', nullable: true })
    birthday: Date | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nick: string | null;

    @Column({
        type: 'enum',
        enum: ['local', 'extra', 'google', 'facebook'],
        default: 'local',
    })
    type: 'local' | 'extra' | 'google' | 'facebook';

    @Column({ type: 'longtext', nullable: true })
    config: string | null; // JSON (lo parseas tú)

    @Column({ type: 'bigint', nullable: true })
    fkid_profile: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_user: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    /** RELATIONS */
    @OneToOne(() => User, (u) => u.data)
    @JoinColumn({ name: 'fkid_user' })
    user: User;

    @ManyToOne(() => SysProfile, (p) => p.users)
    @JoinColumn({ name: 'fkid_profile' })
    profile: SysProfile;
}
