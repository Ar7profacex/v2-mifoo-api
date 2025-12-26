import { EPaymentMethod, ETypeDocument, ETypeOrder } from '@ar7profacex/shared';
import {
    Entity,
    Column,
    PrimaryColumn,
    Index,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { PosShift } from './pos-shift.entity';
import { PosOrder } from './pos-order.entity';
import { PosDocument } from './pos-document.entity';
import { PosPoint } from './pos-point.entity';
import { PosMarket } from './pos-market.entity';
import { PosCompany } from './pos-company.entity';

@Entity('view_mt_dashboard')
@Index('idx_view_mt_dashboard_dateOrder', ['dateOrder'])
@Index('view_mt_dashboard_fkid_pos_shift_index', ['idShift'])
export class ViewMtDashboard extends BaseEntity {

    /* =========================
     * DOCUMENT
     * ========================= */

    @PrimaryColumn({ type: 'bigint', unsigned: true })
    idDocument: number;

    @Column({ type: 'bigint', nullable: true })
    numberDocument: number | null;

    /* =========================
     * ORDER
     * ========================= */

    @Column({ type: 'bigint', unsigned: true })
    idOrder: number;

    @Column({ type: 'bigint', nullable: true })
    numberOrder: number | null;

    /* =========================
     * AMOUNTS
     * ========================= */

    @Column({ type: 'double', default: 0, comment: 'TOTAL - DISCOUNT ORDER' })
    valueDocument: number;

    @Column({ type: 'double', default: 0, comment: 'IMPUESTOS DE VALUE' })
    taxesDocument: number;

    @Column({ type: 'double', default: 0, comment: 'VALUE - IMPUESTOS' })
    subValueDocument: number;

    @Column({ type: 'double', default: 0, comment: 'PROPINA' })
    valueGratDocument: number;

    @Column({ type: 'double', default: 0, comment: 'PAGO EFECTUADO' })
    payDocument: number;

    @Column({ type: 'double', default: 0, comment: 'VUELTO O CAMBIO' })
    changeDocument: number;

    @Column({ type: 'double', default: 0, comment: 'VALOR DELIVERY' })
    valueDeliveryDocument: number;

    /* =========================
     * DOCUMENT INFO
     * ========================= */

    @Column({
        type: 'enum',
        enum: ETypeDocument,
        default: ETypeDocument.TICKET,
    })
    typeDocument: ETypeDocument;

    @Column({
        type: 'enum',
        enum: EPaymentMethod,
        default: EPaymentMethod.DEBITO,
    })
    methodDocument: EPaymentMethod;

    /* =========================
     * POINT / MARKET / COMPANY
     * ========================= */

    @Column({ type: 'bigint', nullable: true })
    idPoint: number | null;

    @Column({ type: 'int', nullable: true })
    point: number | null;

    @Column({ type: 'bigint', unsigned: true })
    idMarket: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    market: string | null;

    @Column({ type: 'bigint', unsigned: true })
    idCompany: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    company: string | null;

    @Column({ type: 'varchar', length: 511, nullable: true })
    runCompany: string | null;

    /* =========================
     * USER / ORDER
     * ========================= */

    @Column({ type: 'bigint', unsigned: true })
    idUser: number;

    @Column({ type: 'varchar', length: 255 })
    nameUser: string;

    @Column({
        type: 'enum',
        enum: ETypeOrder,
        default: ETypeOrder.LOCAL,
    })
    typeOrder: ETypeOrder;

    /* =========================
     * DATES
     * ========================= */

    @Column({ type: 'timestamp', nullable: true })
    dateTimeOrder: Date | null;

    @Column({ type: 'date', nullable: true })
    dateOrder: string | null;

    @Column({ type: 'datetime' })
    dateUpdated: Date;

    /* =========================
     * SHIFT
     * ========================= */

    @Column({ type: 'bigint', nullable: true })
    idShift: number | null;

    @OneToOne(() => PosShift)
    @JoinColumn({ name: 'idShift', referencedColumnName: 'id' })
    posShift: PosShift;

    @OneToOne(() => PosOrder)
    @JoinColumn({ name: 'idOrder', referencedColumnName: 'id' })
    posOrder: PosOrder;

    @OneToOne(() => PosDocument)
    @JoinColumn({ name: 'idDocument', referencedColumnName: 'id' })
    posDocument: PosDocument;

    @OneToOne(() => PosPoint)
    @JoinColumn({ name: 'idPoint', referencedColumnName: 'id' })
    posPoint: PosPoint;

    @OneToOne(() => PosMarket)
    @JoinColumn({ name: 'idMarket', referencedColumnName: 'id' })
    posMarket: PosMarket;

    @OneToOne(() => PosCompany)
    @JoinColumn({ name: 'idCompany', referencedColumnName: 'id' })
    posCompany: PosCompany;
}
