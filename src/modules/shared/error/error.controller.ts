// error controller

import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorService } from './error.service';

@Controller('error')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Get('/')
  getError(): string {
    return this.errorService.getError();
  }

  @Get('/built-in')
  getBuiltInError() {
    throw new HttpException(
      'This is a built-in error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
