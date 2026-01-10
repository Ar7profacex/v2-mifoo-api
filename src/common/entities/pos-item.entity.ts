import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
    OneToMany,
    JoinColumn,
    BaseEntity,
} from 'typeorm';
import { PosProductDetail } from './pos-product-detail.entity';
import { StatusEnum } from '@ar7profacex/shared';

export enum ItemStatus {
    VIGENTE = 'VIGENTE',
    DE_BAJA = 'DE BAJA',
}

@Entity({ name: 'pos_items' })
@Index(['fkidPosMarket'])
export class PosItem extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name!: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description!: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    alias!: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image!: string | null;

    @Column({ type: 'double', default: 0, nullable: true })
    value!: number;

    @Column({ type: 'longtext', nullable: true })
    ingredients!: any;

    @Column({ type: 'longtext', nullable: true })
    dressings!: any;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.VIGENTE,
    })
    status!: StatusEnum;

    @Column({ name: 'fkid_pos_market', type: 'bigint', nullable: true })
    fkidPosMarket!: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt!: Date;

    /* RELATIONS */
    @OneToMany(() => PosProductDetail, d => d.item)
    @JoinColumn({ referencedColumnName: "fkid_pos_item", name: 'id' })
    productDetails!: PosProductDetail[];
}
