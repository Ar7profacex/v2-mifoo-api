import { SetMetadata } from "@nestjs/common";
export const META_CONTROLLER_PROTECTED = 'controller-protected';

export const ControllerProtected = (controller: string) => {
    return SetMetadata(META_CONTROLLER_PROTECTED, controller);
}
