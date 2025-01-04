import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login(): string {
    return 'This action logs a user in';
  }

  logout(): string {
    return 'This action logs a user out';
  }

  signup(): string {
    return 'This action signs a user up';
  }
}
