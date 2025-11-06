import { EPermission } from "@ar7profacex/shared";
import { SetMetadata } from "@nestjs/common";
export const META_PERMISSIONS_PROTECTED = 'permission-protected';

export const PermissionProtected = (...args: EPermission[]) => {
    return SetMetadata(META_PERMISSIONS_PROTECTED, args);
}
