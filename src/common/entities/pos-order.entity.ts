import { EPaymentMethod, EPaymentMethodStr, EStatusOrder, ETypeDocument, ETypeDocumentStr, ETypeOrder } from '@ar7profacex/shared';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { PosOrderDetail } from './pos-order-detail.entity';
import { PosDocument } from './pos-document.entity';
import { PosShift } from './pos-shift.entity';
import { PosPoint } from './pos-point.entity';
import { User } from './user.entity';
import { PosMarket } from './pos-market.entity';

@Entity('pos_orders')
@Index('pos_orders_fkid_pos_contact_index', ['fkid_pos_contact'])
@Index('pos_orders_fkid_pos_delivery_man_index', ['fkid_pos_delivery_man'])
@Index('pos_orders_fkid_pos_point_index', ['fkid_pos_point'])
@Index('pos_orders_fkid_pos_shift_index', ['fkid_pos_shift'])
@Index('pos_orders_fkid_user_index', ['fkid_user'])
@Index('pos_orders_number_index', ['number'])
export class PosOrder extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', nullable: true })
    number: number | null;

    @Column({ type: 'double', default: 0 })
    value: number;

    @Column({ type: 'double', default: 0 })
    discount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    observation: string | null;

    @Column({
        type: 'enum',
        enum: EStatusOrder,
        default: EStatusOrder.SOLICITADO,
    })
    status: EStatusOrder;

    @Column({
        type: 'enum',
        enum: ETypeOrder,
        default: ETypeOrder.LOCAL,
    })
    type: ETypeOrder;

    @Column({ type: 'datetime', nullable: true })
    expiration: Date | null;

    @Column({ type: 'longtext', nullable: true })
    dataFreeze: string | null; // JSON

    @Column({ type: 'varchar', length: 100, nullable: true })
    document: string | null;

    @Column({ type: 'bigint', default: 1, nullable: true })
    fkid_pos_contact: number | null;

    @Column({ type: 'bigint', default: 1, nullable: true })
    fkid_pos_delivery_man: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_point: number | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_user: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_shift: number | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date | null;

    @OneToMany(() => PosOrderDetail, (posOrderDetail) => posOrderDetail.posOrder)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_pos_order' })
    posOrderDetails: PosOrderDetail[];

    @OneToMany(() => PosDocument, (posDocument) => posDocument.posOrder)
    @JoinColumn({ name: 'id', referencedColumnName: 'fkid_pos_order' })
    posDocuments: PosDocument[];

    @ManyToOne(() => PosShift, (posShift) => posShift.posOrders)
    @JoinColumn({ name: 'fkid_pos_shift', referencedColumnName: 'id' })
    posShift: PosShift;

    @ManyToOne(() => PosPoint, (posPoint) => posPoint.posOrders)
    @JoinColumn({ name: 'fkid_pos_point', referencedColumnName: 'id' })
    posPoint: PosPoint;

    @OneToOne(() => User)
    @JoinColumn({ name: 'fkid_user', referencedColumnName: 'id' })
    author: User;

    //PARA REPORTE NO PAGADOS
    idDocument?: number;
    numberDocument?: number;
    idOrder?: number;
    numberOrder?: number;
    valueDocument?: number;
    taxesDocument?: number;
    subValueDocument?: number;
    valueGratDocument?: number;
    payDocument?: number;
    changeDocument?: number;
    valueDeliveryDocument?: number;
    typeDocument?: ETypeDocumentStr;
    methodDocument?: EPaymentMethodStr;
    idPoint?: number;
    point?: number;
    idMarket?: number;
    market?: string;
    idCompany?: number;
    company?: string;
    runCompany?: string;
    idUser?: number;
    nameUser?: string;
    typeOrder?: ETypeOrder;
    dateTimeOrder?: Date;
    dateOrder?: Date;
    dateUpdated?: Date;
    idShift?: number;

    posMarket?: Partial<PosMarket>;
    posOrder?: Partial<PosOrder>;
    posDocument?: Partial<PosDocument>;
}
