import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from 'src/modules/user/util/roleUser';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (
    userObject.role === UserRole.BACKOFICCE ||
    UserRole.ADMIN ||
    UserRole.CAMPO
  ) {
    delete userObject.passwordHash;
    delete userObject.role
    delete userObject.deleted

    return userObject;
  } else {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }
});
