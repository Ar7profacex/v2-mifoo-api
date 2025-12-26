import { ETypeDocument } from '@ar7profacex/shared';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity('pos_documents_files')
@Index('pos_documents_files_fkid_pos_document_index', ['fkid_pos_document'])
@Index('pos_documents_files_ident_index', ['ident'])
export class PosDocumentFile extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    ident: string | null;

    @Column({
        type: 'enum',
        enum: ETypeDocument,
        default: ETypeDocument.TICKET,
    })
    type: ETypeDocument;

    @Column({ type: 'varchar', length: 100, nullable: true })
    document: string | null;

    @Column({ type: 'bigint', nullable: true })
    fkid_pos_document: number | null;

    @Column({ type: 'bigint', default: 2 })
    sesion: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date | null;
}
