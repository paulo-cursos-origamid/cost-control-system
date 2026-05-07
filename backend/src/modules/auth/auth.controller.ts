import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from '.';

// 🔐 Guard JWT
import { JwtAuthGuard } from 'src/shared/interfaces/jwt-user.interface';

// 👤 Interface do usuário autenticado
import { JwtUser } from 'src/shared/interfaces/jwt-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  ///////////////////////////////////////////////////////
  // 🔐 LOGIN
  ///////////////////////////////////////////////////////

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(
      data.email,
      data.password,
    );
  }

  ///////////////////////////////////////////////////////
  // 👤 USUÁRIO LOGADO
  ///////////////////////////////////////////////////////

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(
    @Req() req: Request & { user: JwtUser },
  ) {
    return this.authService.getMe(
      req.user.userId,
    );
  }
}