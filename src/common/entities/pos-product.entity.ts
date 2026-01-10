import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
    OneToMany,
    BaseEntity,
    JoinColumn,
} from 'typeorm';
import { PosProductDetail } from './pos-product-detail.entity';
import { StatusEnum } from '@ar7profacex/shared';
import { PosOrderDetail } from './pos-order-detail.entity';

@Entity({ name: 'pos_products' })
@Index(['fkidPosMarket'])
@Index(['fkidPosProductCategory'])
export class PosProduct extends BaseEntity {
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

    @Column({ type: 'double', default: 0, nullable: true })
    discount!: number;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.VIGENTE,
    })
    status!: StatusEnum;

    @Column({ name: 'fkid_pos_product_category', type: 'bigint', nullable: true })
    fkidPosProductCategory!: number | null;

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
    @OneToMany(() => PosProductDetail, d => d.product)
    @JoinColumn({ name: 'fkid_pos_product', referencedColumnName: 'id' })
    details!: PosProductDetail[];

    @OneToMany(() => PosOrderDetail, (posOrderDetail) => posOrderDetail.posProduct)
    @JoinColumn({ name: 'fkid_pos_product', referencedColumnName: 'id' })
    posOrderDetails!: PosOrderDetail[];
}
