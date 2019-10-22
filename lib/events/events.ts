import { EventEmitter } from 'events';
import { AuditTransfer, IAuditTransfer } from '../models/audit-transfer.model';


export const eventEmitter = new EventEmitter();

eventEmitter.on('audit', async (audit: IAuditTransfer) => {
    await AuditTransfer.create(audit);
});
