import { Request } from 'express';
import { Role } from '../enums/role.enum';

export type AuthenticatedUser = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

export type RequestWithUser = Request & {
  user?: AuthenticatedUser;
};
