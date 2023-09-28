import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext & { user: API.ValidatePayload }) {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		const level = context.getArgs()?.[0]?.user.level;

		if (!requiredRoles.includes(level)) {
			throw new HttpException("权限等级不足", HttpStatus.BAD_REQUEST);
		}
		return true;
	}
}
