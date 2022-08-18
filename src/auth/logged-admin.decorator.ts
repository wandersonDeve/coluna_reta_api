import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from 'src/user/util/roleUser';

export const LoggedAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (userObject.user.role === UserRole.ADMIN) {
    delete userObject.user.passwordHash;

    return userObject;
  } else {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }
});
