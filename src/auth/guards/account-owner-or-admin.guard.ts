import {
  CanActivate,
  ExecutionContext,
  Injectable
} from "@nestjs/common";
import { Role } from "@prisma/client";

@Injectable()
export class AccountOwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const {
      user,
      params: { id }
    } = context.switchToHttp().getRequest();

    return user.id === id || user.role === Role.ADMIN;
  }
}
