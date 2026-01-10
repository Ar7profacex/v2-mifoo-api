import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { PosProduct } from './pos-product.entity';
import { PosItem } from './pos-item.entity';
import { PosOrderDetail } from './pos-order-detail.entity';

@Entity({ name: 'pos_products_details' })
@Index(['fkidPosProduct'])
@Index(['fkidPosItem'])
export class PosProductDetail extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: number;

    @Column({ type: 'double', default: 0, nullable: true })
    value!: number;

    @Column({ type: 'double', default: 0, nullable: true })
    discount!: number;

    @Column({ name: 'lim_ingredients', type: 'int', default: 0, nullable: true })
    limIngredients!: number;

    @Column({ name: 'lim_dressings', type: 'int', default: 0, nullable: true })
    limDressings!: number;

    @Column({ name: 'fkid_pos_product', type: 'bigint', nullable: true })
    fkidPosProduct!: number | null;

    @Column({ name: 'fkid_pos_item', type: 'bigint', nullable: true })
    fkidPosItem!: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt!: Date;

    /* RELATIONS */
    @ManyToOne(() => PosProduct, p => p.details)
    @JoinColumn({ name: 'fkid_pos_product', referencedColumnName: 'id' })
    product!: PosProduct;

    @ManyToOne(() => PosItem, i => i.productDetails)
    @JoinColumn({ name: 'fkid_pos_item', referencedColumnName: "id" })
    item!: PosItem;

    @OneToMany(() => PosOrderDetail, (posOrderDetail) => posOrderDetail.posProductDetail)
    @JoinColumn({ name: 'fkid_pos_product_detail', referencedColumnName: 'id' })
    posOrderDetails!: PosOrderDetail[];
}
