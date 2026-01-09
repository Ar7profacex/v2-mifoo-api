import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    Index,
    BaseEntity,
} from 'typeorm';
import { UserData } from './user-data.entity';
import { ConfirmacionEnum } from '@ar7profacex/shared';

@Entity({ name: 'users' })
@Index(['email'], { unique: true })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    email_verified_at: Date | null;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({
        type: 'enum',
        enum: ConfirmacionEnum,
        default: ConfirmacionEnum.SI,
    })
    active: ConfirmacionEnum;

    @Column({ type: 'varchar', length: 250, nullable: true })
    google_id: string | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    remember_token: string | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    observation: string | null;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    /** RELATIONS */
    @OneToOne(() => UserData, (ud) => ud.user)
    data: UserData;
}
