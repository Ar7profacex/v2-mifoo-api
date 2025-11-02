import { SetMetadata } from "@nestjs/common";
import { EPermission } from "src/common/enum/permission.enum";
export const META_PERMISSIONS_PROTECTED = 'permission-protected';

export const PermissionProtected = (...args: EPermission[]) => {
    return SetMetadata(META_PERMISSIONS_PROTECTED, args);
}
