import { JwtUser } from '../types/jwt-user.interface';

export class TransactionPolicy {
  static canDelete(
    user: JwtUser,
  ): boolean {
    return user.role === 'ADMIN';
  }

  static canUpdate(
    user: JwtUser,
    ownerId: string,
  ): boolean {
    return (
      user.role === 'ADMIN' ||
      user.sub === ownerId
    );
  }
}